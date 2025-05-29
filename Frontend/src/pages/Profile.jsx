import { useSelector } from "react-redux";
import ProfileCard from "../components/profile/ProfileCard";
import SubmissionHeatmap from "../components/profile/SubmissionHeatmap";
import StatsSummaryCard from "../components/profile/StatsSummary";
import TabsSection from "../components/profile/TabsSection";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 min-h-screen bg-[#000814] home-gradient text-white">
      <div className="flex gap-20 w-full max-w-7xl mx-auto mb-10 items-center">
        <ProfileCard user={user} />
        <StatsSummaryCard/>
      </div>
      <SubmissionHeatmap userId={user?.id} />
      <div className="mt-10 w-full">
         <TabsSection/>
      </div>
    </div>
  );
};

export default Profile;
