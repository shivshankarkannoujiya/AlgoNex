import { format } from "date-fns";

const ProfileCard = ({ user }) => {
  const formattedDate = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM d, yyyy")
    : "N/A";

  if (!user) return null;

  return (
    <div className="bg-[#000814] text-white rounded-2xl p-6 shadow-md w-full max-w-sm border border-gray-600 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar || "https://avatar.iran.liara.run/public/boy"}
            loading="lazy"
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <p className="text-sm text-zinc-400">{user?.email}</p>
            <p className="text-sm text-zinc-400">Joined: {formattedDate}</p>
          </div>
        </div>

        <div className="mt-4 bg-[#0A1128] rounded-lg px-2 py-2 text-center">
          <p className="text-sm text-zinc-400">Role</p>
          <p className="text-lg font-bold text-teal-400">{user?.role}</p>
        </div>
      </div>

      <button className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition cursor-pointer">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
