import { useSelector } from "react-redux";
import ProfileCard from "../components/profile/ProfileCard";
import SubmissionHeatmap from "../components/profile/SubmissionHeatmap";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 min-h-screen bg-zinc-950 text-white">
      <ProfileCard user={user} />
      <SubmissionHeatmap userId={user?.id} />
    </div>
  );
};

export default Profile;
