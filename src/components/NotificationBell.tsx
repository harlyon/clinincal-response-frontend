import { Bell } from "lucide-react";

export const NotificationBell = () => (
    <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
        <Bell className="w-5 h-5 text-slate-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
);