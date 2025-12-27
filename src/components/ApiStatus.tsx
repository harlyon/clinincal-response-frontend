import { Loader2, RefreshCw } from "lucide-react";
import { useApiStatus } from "../hooks/useApiStatus";

export const ApiStatus = () => {
  const { isApiReady, isChecking, retry } = useApiStatus();

  if (isChecking) {
    return (
      <div className="fixed bottom-4 px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-xs text-slate-300">Checking API status...</span>
      </div>
    );
  }

  if (!isApiReady) {
    return (
      <button
        onClick={retry}
        className="fixed bottom-4 px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
      >
        <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
        <span className="text-xs">Api Not Ready</span>
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
      <span className="text-xs text-slate-300">
        System Operational -&gt; API Ready
      </span>
    </div>
  );
};
