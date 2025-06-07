import { useEffect } from "react";
import { getAllProblems } from "../features/problem/problemThunks";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { ProblemTable } from "../components/index";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { problems, isProblemsLoading, error } = useSelector(
    (state) => state.problems,
  );

  useEffect(() => {
    dispatch(getAllProblems());
  }, [dispatch]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#000814] text-white">
        <Loader className="size-10 animate-ping" />
      </div>
    );
  }
  if (error) {
    <div className="flex items-center justify-center h-screen bg-[#000814] text-red-500">
      <p>Error: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen  bg-[#000814] justify-center text-white p-6 home-gradient">
      <h1 className="text-4xl font-bold text-center mb-4 mt-10">
        Welcome to <span className="text-teal-500">AlgoNex</span>
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Practice problems by topic, difficulty, and patterns to master DSA like
        a pro.
      </p>

      {problems.length > 0 ? (
        <div className="max-w-7xl mx-auto w-full">
          <ProblemTable problems={problems} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-[#000814] text-white">
          <h1 className="text-4xl text-white ">No Problem Found</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
