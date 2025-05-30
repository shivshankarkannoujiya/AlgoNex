import { FileText, Code2, MessageSquare, Lightbulb } from "lucide-react";

const TabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "description", icon: FileText, label: "Description" },
    { name: "submissions", icon: Code2, label: "Submissions" },
    { name: "discussion", icon: MessageSquare, label: "Discussion" },
    { name: "hints", icon: Lightbulb, label: "Hints" },
  ];

  return (
    <div className="flex flex-wrap justify-between sm:justify-start border-b border-gray-700 bg-gray-950">
      {tabs.map(({ name, icon: Icon, label }) => {
        const isActive = activeTab === name;

        return (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              isActive
                ? "text-teal-400 border-teal-500"
                : "text-gray-300 border-transparent hover:text-white hover:border-gray-500"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
