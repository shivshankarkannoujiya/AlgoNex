const QuestionItem = ({ title, tags, difficulty }) => (
    <div className="flex justify-between items-center bg-gray-800 p-3 rounded-md hover:bg-gray-700">
        <div>
            <p>{title}</p>
            <div className="flex gap-2 mt-1 text-xs text-gray-400">
                {tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                ))}
            </div>
        </div>
        <span className="text-green-400 text-sm">{difficulty}</span>
    </div>
);

export default QuestionItem;
