import { capitalizeFirstLetter } from "../utils/stringUtils";

interface UserProfileProps {
  name?: string;
  role?: string;
  institution?: string;
  onLogout: () => void;
}
export const UserProfile = ({
  name,
  role,
  institution,
  onLogout,
}: UserProfileProps) => (
  <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium">
      {name?.charAt(0).toUpperCase() || "U"}
    </div>
    <div className="hidden sm:block">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-slate-900">{name}</p>
      </div>
      <p className="text-xs text-slate-500">
        {role ? capitalizeFirstLetter(role) : "User"} •{" "}
        {institution || "Institution"}
      </p>
    </div>
  </div>
);
