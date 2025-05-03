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

/**
 * @description
 * This method will hit the judge0 end point
 */
export const submitBatch = async (submission) => {
    const { data } = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
        {
            submission,
        },
    );

    console.log(`Submission Result: `, data);
    return data; // [{token}, {token}, {token}]
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
    while (true) {
        const { data } = await axios.get(
            `${process.env.JUDGE0_API_URL}/submissions/batch`,
            {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: false,
                },
            },
        );

        const results = data.submissions;
        const isAllDone = results.every(
            (result) => result.status.id !== 1 && result.status.id !== 2,
        );

        if (!isAllDone) {
            await sleep(1000);
        }

        return results;
    }
};
