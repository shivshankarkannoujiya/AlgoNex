import SortIcons from "./SortIcon";
  
const SearchBar = () => (
  <div className="flex items-center bg-gray-700 px-4 py-2 rounded-md w-96">
    <input
      className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
      placeholder="Search questions"
    />
    <SortIcons />
  </div>
);

export default SearchBar