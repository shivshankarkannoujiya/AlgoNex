import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../components/profile/ProfileCard";


const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 min-h-screen bg-zinc-950 text-white flex justify-center">
      <ProfileCard user={user} />
    </div>
  );
};

export default Profile;
