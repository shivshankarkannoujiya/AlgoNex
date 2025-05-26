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