import { LogoutButton } from "./LogoutButton";
import { NotificationBell } from "./NotificationBell";
import { UserProfile } from "./UserProfile";
import { type TopNavigationProps } from "../types/types";
import { useAuth } from "../hooks/useAuth";

const TopNavigation = ({ mode, user }: TopNavigationProps) => {
  const { logout } = useAuth();
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/80 sticky top-0 z-0">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 max-sm:pl-[42px]">
            {mode === "single" ? "Patient Analysis" : "Batch Processing"}
          </h2>
          <p className="text-xs text-slate-500 max-sm:pl-[42px]">
            {mode === "single"
              ? "Individual patient response prediction"
              : "Upload and analyze multiple patients"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <NotificationBell />
          <LogoutButton onLogout={logout} />
          <UserProfile
            name={user?.name}
            role={user?.role}
            institution={user?.institution}
            onLogout={logout}
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
