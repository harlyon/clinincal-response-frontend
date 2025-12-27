import { useState } from "react";
import {
  Calculator,
  ChevronRight,
  Users,
  Activity,
  X,
  Menu,
} from "lucide-react";
import { type SideBarProps } from "../types/types";
import { ApiStatus } from "./ApiStatus";

const SideBar = ({ mode, setMode }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-900 text-white rounded-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
    fixed lg:relative inset-y-0 left-0 z-40 w-64 
    bg-gradient-to-b from-slate-900 to-slate-800 text-white 
    flex-shrink-0 transition-all duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MediDash</h1>
              <p className="text-xs text-slate-300">Clinical Analytics</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => {
                setMode("single");
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                mode === "single"
                  ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white border-l-4 border-cyan-400"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center">
                <Calculator className="w-4 h-4 mr-3" />
                Single Patient
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMode("batch");
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                mode === "batch"
                  ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white border-l-4 border-cyan-400"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-3" />
                Batch Analysis
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>

          <div className="mt-auto pt-12 border-t border-slate-700/50">
            <ApiStatus />
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
