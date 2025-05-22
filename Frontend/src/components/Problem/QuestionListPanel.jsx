import SearchBar from "./SearchBar"
import QuestionItem from "./QuestionItem"

const QuestionListPanel = () => (
  <div className="flex-1 ml-6 mt-2 text-white">
    <SearchBar />
    <div className="mt-4">
      <QuestionItem
        title="1. Two Sum"
        tags={["Array", "Hash Table"]}
        difficulty="Easy"
      />
    </div>
  </div>
);

export default QuestionListPanel