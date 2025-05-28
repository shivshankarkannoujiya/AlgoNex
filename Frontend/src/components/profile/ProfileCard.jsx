import React from "react";

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-md w-full max-w-sm">
      {/* Avatar & Username */}
      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700"
        />
        <div>
          <h2 className="text-xl font-semibold">User.fullname</h2>
          <p className="text-sm text-zinc-400">User.username</p>
        </div>
      </div>

      {/* Rank */}
      <div className="mt-4 bg-zinc-800 rounded-lg px-4 py-2 text-center">
        <p className="text-sm text-zinc-400">Rank</p>
        <p className="text-lg font-bold text-green-400">
          User.rank
        </p>
      </div>

      {/* Country + Handle */}
      <div className="mt-4 text-sm text-zinc-300 space-y-1">
        <div className="flex items-center">
          <span className="mr-2">🌍</span>
          <span>User.country</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🔗</span>
          <span>User.handle</span>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
