import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Plus, Trash2, FileText, CheckCircle2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import apiClient from "../../Service/apiClient";
import { sampledpData, sampleStringProblem } from "../../constants/sampleData";

const CreateProblemForm = () => {
    const [sampleType, setSampleType] = useState("DP");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            difficulty: "EASY",
            constraints: "",
            hints: "",
            editorial: "",
            testcases: [{ input: "", output: "" }],
            tags: [""],
            example: {
                JAVASCRIPT: { input: "", output: "", explanation: "" },
                PYTHON: { input: "", output: "", explanation: "" },
                JAVA: { input: "", output: "", explanation: "" },
            },
            codeSnippets: {
                JAVASCRIPT:
                    "function solution() {\n  // Write your code here\n}",
                PYTHON: "def solution():\n    # Write your code here\n    pass",
                JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
            },
            referenceSolution: {
                JAVASCRIPT: "// Add your reference solution here",
                PYTHON: "# Add your reference solution here",
                JAVA: "// Add your reference solution here",
            },
        },
    });

    const {
        fields: testCaseFields,
        append: appendTestCase,
        remove: removeTestCase,
        replace: replaceTestcases,
    } = useFieldArray({ control, name: "testcases" });
    const {
        fields: tagFields,
        append: appendTag,
        remove: removeTag,
        replace: replaceTags,
    } = useFieldArray({ control, name: "tags" });

    const onSubmit = async (value) => {
        try {
            setIsLoading(true);
            const res = await apiClient.createProblem(value);
            toast.success(
                res.data.message || "Problem Created successfully ⚡",
            );
            navigation("/dashboard");
        } catch (error) {
            console.error("Error while creating problem:", error);
            toast.error("Error creating problem");
        } finally {
            setIsLoading(false);
        }
    };

    const loadSampleData = () => {
        const sampleData =
            sampleType === "DP" ? sampledpData : sampleStringProblem;
        replaceTags(sampleData.tags.map((tag) => tag));
        replaceTestcases(sampleData.testcases.map((tc) => tc));
        reset(sampleData);
    };

    const languages = ["JAVASCRIPT", "PYTHON", "JAVA"];

    return (
        <div className="bg-[#000814] home-gradient min-h-screen px-6 py-10 text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-6xl mx-auto bg-[#000814] p-8 rounded-2xl shadow-2xl border border-[#00f7ff40] space-y-12"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between gap-4"
                >
                    <h2 className="text-3xl font-bold flex items-center gap-3 text-teal-500">
                        <FileText className="w-7 h-7" />
                        Create Problem
                    </h2>
                    <div className="flex flex-col md:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => setSampleType("DP")}
                            className={`px-4 py-2 rounded-full border ${sampleType === "DP" ? "bg-teal-600 text-white" : "border-gray-600 text-white"}`}
                        >
                            DP Problem
                        </button>
                        <button
                            type="button"
                            onClick={() => setSampleType("string")}
                            className={`px-4 py-2 rounded-full border ${sampleType === "string" ? "bg-teal-600 text-white" : "border-gray-600 text-white"}`}
                        >
                            String Problem
                        </button>
                        <button
                            type="button"
                            onClick={loadSampleData}
                            className="bg-teal-600 text-white px-4 py-2 rounded-full hover:shadow-[0_0_8px_#00f7ff]"
                        >
                            <Download className="inline w-4 h-4 mr-1" /> Load
                            Sample
                        </button>
                    </div>
                </motion.div>

                {/* Title, Description, Difficulty */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {[
                        "title",
                        "description",
                        "constraints",
                        "hints",
                        "editorial",
                    ].map((field, i) => (
                        <div key={field}>
                            <label className="text-lg font-semibold block mb-2 capitalize">
                                {field}
                            </label>
                            <textarea
                                {...register(field)}
                                placeholder={`Enter ${field}`}
                                className={`w-full ${field === "title" ? "h-12" : "min-h-24"} bg-[#0A1128] text-white border-2 border-[#00f7ff40] focus:ring-4 focus:ring-[#00f7ff66] focus:border-[#4b9092] px-4 py-3 rounded-xl resize-y transition-all`}
                            />
                        </div>
                    ))}
                    <div>
                        <label className="text-lg font-semibold block mb-2">
                            Difficulty
                        </label>
                        <select
                            {...register("difficulty")}
                            className="w-full bg-[#0A1128] text-white border-2 border-[#00f7ff40] focus:ring-4 focus:ring-[#00f7ff66] focus:border-[#00f7ff] px-4 py-3 rounded-xl"
                        >
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                        </select>
                    </div>
                </motion.div>

                {/* Tags */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-teal-400">
                        Tags
                    </h3>
                    {tagFields.map((field, index) => (
                        <div key={field.id} className="flex gap-3">
                            <input
                                {...register(`tags.${index}`)}
                                className="w-full bg-[#0A1128] text-white border border-[#00f7ff40] px-4 py-2 rounded-xl"
                                placeholder="Enter tag"
                            />
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                disabled={tagFields.length === 1}
                                className="text-red-400 hover:text-red-600"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendTag("")}
                        className="bg-teal-600 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Add Tags
                    </button>
                </div>

                {/* Test Cases */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-teal-400">
                        Test Cases
                    </h3>
                    {testCaseFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-[#000814] p-4 rounded-xl space-y-4"
                        >
                            <div className=" flex justify-between items-center">
                                <h4>Test Case {index + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => removeTestCase(index)}
                                    disabled={testCaseFields.length === 1}
                                    className="text-red-400"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className=" grid md:grid-cols-2 gap-4">
                                <textarea
                                    {...register(`testcases.${index}.input`)}
                                    className="input-style min-h-20 bg-[#0A1128] text-white"
                                    placeholder="Input"
                                />
                                <textarea
                                    {...register(`testcases.${index}.output`)}
                                    className="input-style min-h-20 bg-[#0A1128] text-white"
                                    placeholder="Output"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            appendTestCase({ input: "", output: "" })
                        }
                        className="bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer"
                    >
                        + Add Test Case
                    </button>
                </div>

                {/* Examples & Code Editors */}
                {languages.map((lang) => (
                    <div key={lang} className="space-y-8">
                        <h3 className="text-xl font-semibold text-teal-400">
                            {lang}
                        </h3>

                        {/* Example */}
                        <div className="space-y-4 grid md:grid-cols-3 gap-4">
                            <textarea
                                {...register(`examples.${lang}.input`)}
                                placeholder="Example Input"
                                className="input-style min-h-24 bg-[#0A1128] text-white p-4"
                            />
                            <textarea
                                {...register(`examples.${lang}.output`)}
                                placeholder="Example Output"
                                className="input-style min-h-24 bg-[#0A1128] text-white p-4"
                            />
                            <textarea
                                {...register(`examples.${lang}.explanation`)}
                                placeholder="Explanation"
                                className="input-style min-h-24 bg-[#0A1128] text-white p-4"
                            />
                        </div>

                        {/* Starter Code */}
                        <div>
                            <h4 className="text-lg mb-2">Starter Code</h4>
                            <Controller
                                name={`codeSnippets.${lang}`}
                                control={control}
                                render={({ field }) => (
                                    <Editor
                                        height="300px"
                                        language={lang.toLowerCase()}
                                        theme="vs-dark"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={{
                                            fontSize: 14,
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            formatOnType: true,
                                            formatOnPaste: true,
                                            automaticLayout: true,
                                            lineNumbers: "on",
                                        }}
                                        onMount={(editor) => {
                                            setTimeout(() => {
                                                editor
                                                    .getAction(
                                                        "editor.action.formatDocument",
                                                    )
                                                    .run();
                                            }, 100);
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {/* Reference Solution */}
                        <div>
                            <h4 className="text-lg mt-4 mb-2">
                                Reference Solution
                            </h4>
                            <Controller
                                name={`referenceSolution.${lang}`}
                                control={control}
                                render={({ field }) => (
                                    <Editor
                                        height="300px"
                                        language={lang.toLowerCase()}
                                        theme="vs-dark"
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={{
                                            fontSize: 14,
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            formatOnType: true,
                                            formatOnPaste: true,
                                            automaticLayout: true,
                                            lineNumbers: "on",
                                        }}
                                        onMount={(editor) => {
                                            setTimeout(() => {
                                                editor
                                                    .getAction(
                                                        "editor.action.formatDocument",
                                                    )
                                                    .run();
                                            }, 100);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-[#00f7ff30]">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-[0_0_12px_#00f7ff] transition-all font-semibold flex items-center gap-3 cursor-pointer"
                    >
                        {isLoading ? (
                            <h3>Loading....</h3>
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" /> Create
                                Problem
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProblemForm;
