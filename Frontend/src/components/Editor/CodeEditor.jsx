import { memo } from "react";
import Editor from "@monaco-editor/react";
import { Copy } from "lucide-react";

const CodeEditor = ({
    label,
    language,
    value,
    onChange,
    className = "",
    height = "300px",
    showCopyButton = true,
}) => {
    const handleCopy = () => {
        if (value) navigator.clipboard.writeText(value);
    };

    return (
        <div className={className}>
            {label && (
                <label className="text-gray-300 font-semibold mb-2 flex items-center gap-2">
                    {label}
                    {showCopyButton && (
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-white transition-colors"
                            title="Copy to clipboard"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    )}
                </label>
            )}
            <Editor
                height={height}
                theme="vs-dark"
                language={language}
                value={value || ""}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    lineNumbers: "on",
                    tabSize: 2,
                    insertSpaces: true,
                    cursorBlinking: "smooth",
                    cursorStyle: "line",
                    smoothScrolling: true,
                    fontFamily: "Fira Code, monospace",
                }}
            />
        </div>
    );
};

export default memo(CodeEditor);
