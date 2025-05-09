import axios from "axios";

export const getJudge0LanguageId = (language) => {
    const languageMap = {
        PYTHON: 71,
        JAVA: 62,
        JAVASCRIPT: 63,
    };

    const id = languageMap[language.toUpperCase()];
    if (!id) {
        throw new Error(`Unsupported language: ${language}`);
    }
    return id;
};

export const getLanguageNameById = (language_id) => {
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        71: "PYTHON",
        62: "JAVA",
        63: "JAVASCRIPT",
    };

    return LANGUAGE_NAMES[language_id] || "Unknown";
};

/**
 * @description
 * This method will hit the judge0 end point
 */
// export const submitBatch = async (submission) => {
//     const { data } = await axios.post(
//         `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
//         {
//             submission,
//         },
//     );

//     console.log(`Submission Result: `, data);
//     return data; // [{token}, {token}, {token}]
// };

export const submitBatch = async (submissions) => {
    try {
        const { data } = await axios.post(
            `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
            { submissions },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${process.env.SULU_JUDGE0_API_TOKEN}`,
                },
            },
        );

        console.log(`Submission Result: `, data);
        return data; // [{token}, {token}, {token}]
    } catch (error) {
        console.error(
            "Error while submitting batch: ",
            error.response?.data || error.message,
        );
        throw error;
    }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export const pollBatchResults = async (tokens) => {
//     while (true) {
//         const { data } = await axios.get(
//             `${process.env.JUDGE0_API_URL}/submissions/batch`,
//             {
//                 params: {
//                     tokens: tokens.join(","),
//                     base64_encoded: false,
//                 },
//             },
//         );

//         const results = data.submissions;
//         const isAllDone = results.every(
//             (result) => result.status.id !== 1 && result.status.id !== 2,
//         );

//         if (!isAllDone) {
//             await sleep(1000);
//         }

//         return results;
//     }
// };

export const pollBatchResults = async (tokens) => {
    try {
        while (true) {
            const { data } = await axios.get(
                `${process.env.JUDGE0_API_URL}/submissions/batch`,
                {
                    params: {
                        tokens: tokens.join(","),
                        base64_encoded: false,
                    },
                    headers: {
                        Authorization: `Bearer ${process.env.SULU_JUDGE0_API_TOKEN}`,
                        Accept: "application/json",
                    },
                },
            );

            const results = data.submissions;
            console.log(`<-------------- Printing Result --------->`);
            console.log(results);

            if (!Array.isArray(results)) {
                throw new Error(
                    "Expected an array from Judge0, but got: " +
                        JSON.stringify(results),
                );
            }

            const isAllDone = results.every(
                (result) => result.status.id !== 1 && result.status.id !== 2,
            );

            if (isAllDone) {
                return results;
            }

            await sleep(1000);
        }
    } catch (error) {
        console.error("Error while polling: ", error);
        throw error;
    }
};
