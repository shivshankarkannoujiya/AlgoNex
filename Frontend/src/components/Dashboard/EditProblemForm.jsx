import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getProblemById,
  updateProblem,
} from "../../features/problem/problemThunks";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

const languages = ["JAVASCRIPT", "PYTHON", "JAVA"];

const EditProblemForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { problem, isProblemLoading } = useSelector((state) => state.problems);
  const [isUpdating, setIsUpdating] = useState(false);

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
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {},
      referenceSolution: {},
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


  useEffect(() => {
    dispatch(getProblemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (problem && problem.id === id) {
      reset({
        ...problem,
        examples: problem.examples || {
          JAVASCRIPT: { input: "", output: "", explanation: "" },
          PYTHON: { input: "", output: "", explanation: "" },
          JAVA: { input: "", output: "", explanation: "" },
        },
      });
      replaceTestcases(
        problem.testcases?.length
          ? problem.testcases
          : [{ input: "", output: "" }],
      );
      replaceTags(problem.tags?.length ? problem.tags : [""]);
    }
  }, [problem, id, reset, replaceTestcases, replaceTags]);

  const onSubmit = async (formData) => {
    try {
      setIsUpdating(true);
      const res = await dispatch(updateProblem({ id, problemData: formData }));

      if (updateProblem.fulfilled.match(res)) {
        toast.success("Problem updated successfully");
        navigate("/dashboard");
      } else {
        toast.error(res.payload || "Update failed");
      }
    } catch (error) {
      toast.error("Unexpected error during update");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isProblemLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#000814]">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#000814] px-6 py-10 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto bg-[#000814] p-8 rounded-2xl shadow-2xl border border-[#00f7ff40] space-y-12"
      >
        <h2 className="text-3xl font-bold text-teal-400">Edit Problem</h2>

        {["title", "description", "constraints", "hints", "editorial"].map(
          (field) => (
            <div key={field}>
              <label className="block mb-2 capitalize font-semibold">
                {field}
              </label>
              <textarea
                {...register(field)}
                className="w-full p-4 rounded-xl bg-[#0A1128] border border-[#00f7ff40]"
                rows={field === "title" ? 1 : 4}
                placeholder={`Enter ${field}`}
              />
            </div>
          ),
        )}

        <div>
          <label className="block mb-2 font-semibold">Difficulty</label>
          <select
            {...register("difficulty")}
            className="w-full p-3 bg-[#0A1128] rounded-xl"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-teal-400">Tags</h3>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <input
                {...register(`tags.${index}`)}
                className="w-full bg-[#0A1128] text-white border border-[#00f7ff40] px-4 py-2 rounded-xl"
              />
              <button type="button" onClick={() => removeTag(index)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendTag("")}
            className="text-teal-300"
          >
            + Add Tag
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-teal-400">Test Cases</h3>
          {testCaseFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <textarea
                {...register(`testcases.${index}.input`)}
                className="bg-[#0A1128] p-3 rounded-xl"
                placeholder="Input"
              />
              <textarea
                {...register(`testcases.${index}.output`)}
                className="bg-[#0A1128] p-3 rounded-xl"
                placeholder="Output"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendTestCase({ input: "", output: "" })}
            className="text-teal-300"
          >
            + Add Test Case
          </button>
        </div>

        {languages.map((lang) => (
          <div key={lang} className="space-y-6">
            <h3 className="text-xl text-teal-400">{lang}</h3>

            <div className="grid grid-cols-3 gap-4">
              <textarea
                {...register(`examples.${lang}.input`)}
                className="bg-[#0A1128] p-3 rounded-xl"
                placeholder="Example Input"
              />
              <textarea
                {...register(`examples.${lang}.output`)}
                className="bg-[#0A1128] p-3 rounded-xl"
                placeholder="Example Output"
              />
              <textarea
                {...register(`examples.${lang}.explanation`)}
                className="bg-[#0A1128] p-3 rounded-xl"
                placeholder="Explanation"
              />
            </div>

            <h4 className="font-semibold">Starter Code</h4>
            <Controller
              name={`codeSnippets.${lang}`}
              control={control}
              render={({ field }) => (
                <Editor
                  height="200px"
                  language={lang.toLowerCase()}
                  theme="vs-dark"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <h4 className="font-semibold">Reference Solution</h4>
            <Controller
              name={`referenceSolution.${lang}`}
              control={control}
              render={({ field }) => (
                <Editor
                  height="200px"
                  language={lang.toLowerCase()}
                  theme="vs-dark"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        ))}

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-teal-600 px-6 py-3 rounded-full text-white flex items-center gap-2"
          >
            {isUpdating ? (
              "Updating..."
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Update Problem
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProblemForm;
