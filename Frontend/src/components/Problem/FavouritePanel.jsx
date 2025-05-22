import ProgressRing from "./ProgressRing";
import MiniStats from "./MiniStat"


const FavoritesPanel = () => (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80 h-[20%]">
        {/* Header */}
        <div className="flex items-center gap-3">
            <div className="bg-yellow-400 w-10 h-10 rounded flex items-center justify-center text-white text-xl">
                ★
            </div>
            <div>
                <h2 className="text-white font-semibold">Favorite</h2>
                <p className="text-gray-400 text-sm">
                    Shivshankar Kannoujiya · 1 questions
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
            <button className="bg-white px-3 py-1 rounded-full text-black text-sm">
                ▶ Practice
            </button>
            <button className="text-white">+</button>
            <button className="text-white">🔗</button>
            <button className="text-white">ℹ</button>
        </div>

        {/* Progress */}
        <div className="mt-6">
            <p className="text-gray-300 text-sm mb-2">Progress</p>
            <ProgressRing />
            <MiniStats />
        </div>
    </div>
);

export default FavoritesPanel;
