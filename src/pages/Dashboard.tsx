import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Calculator,
  BarChart3,
} from "lucide-react";
import { predictResponse } from "../utils/api";
import { ClinicalChart } from "../components/ClinicalChart";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopNavigation from "../components/TopNavigation";
import type {
  PatientData,
  PredictionResponse,
  User,
} from "../types/types";
import BatchUpload from "../components/BatchUpload";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
const {logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [chartData, setChartData] = useState<number[] | null>(null);
  const [user, setUser] = useState<{
    name: string;
    role: string;
    institution: string;
  } | null>(null);

  // Default Form State (Simulating a heavy patient)
  const [formData, setFormData] = useState<PatientData>({
    age: 65,
    sex: "Male",
    weight_kg: 95, // High weight -> Low dose intensity
    baseline_severity: 7,
    biomarker_day0: 50,
    biomarker_day1: 52,
    biomarker_day2: 55, // Rising
    biomarker_day3: 54,
    biomarker_day4: 58,
    biomarker_day5: 60, // Failed to drop
  });

  const [mode, setMode] = useState<"single" | "batch">("single");

  useEffect(() => {
    const userData = localStorage.getItem("clinicalUser");
    if (!userData) {
      navigate("/", { replace: true });
    }
    setUser(JSON.parse(userData as string));
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictResponse(formData);
      console.log(res, "this is the result");
      setResult(res);
      setChartData([
        formData.biomarker_day0,
        formData.biomarker_day1,
        formData.biomarker_day2,
        formData.biomarker_day3,
        formData.biomarker_day4,
        formData.biomarker_day5,
      ]);
    } catch (err) {
      console.error("Prediction error:", err);
      alert(
        `Error: ${err instanceof Error ? err.message : "Failed to get prediction"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? ""
            : parseFloat(value)
          : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans text-slate-900 flex">
           

      <SideBar mode={mode} setMode={setMode} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <TopNavigation
          user={user as User}
          handleLogout={logout}
          mode={mode}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {mode === "single" ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 sm:p-6 sticky top-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <Calculator className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Patient Vitals
                      </h2>
                      <p className="text-xs text-slate-500">
                        Enter patient details
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                          Age
                        </label>
                        <input
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                          Sex
                        </label>
                        <select
                          name="sex"
                          value={formData.sex}
                          onChange={handleChange}
                          className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                          Weight (kg)
                        </label>
                        <input
                          name="weight_kg"
                          type="number"
                          value={formData.weight_kg}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-blue-100 bg-blue-50/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                          <span>⚡</span> Used for Dose Intensity calculation
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-slate-800">
                          Biomarker Log (mg/L)
                        </label>
                        <span className="text-xs text-slate-500">Days 0-5</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {[0, 1, 2, 3, 4, 5].map((day) => (
                          <div key={day} className="relative">
                            <label className="text-[10px] font-medium text-slate-500 mb-1.5 block">
                              Day {day}
                            </label>
                            <input
                              name={`biomarker_day${day}`}
                              step="0.1"
                              min="0"
                              type="number"
                              value={(formData as any)[`biomarker_day${day}`]}
                              onChange={handleChange}
                              className="w-full p-2.5 border border-slate-200 rounded-lg bg-white text-sm text-center focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-700 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10 mt-2"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Analyzing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Run Prediction Model
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Col: Visualization & Results */}
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {/* 1. Result Card */}
                {result && (
                  <div
                    className={`p-6 rounded-xl border-l-8 ${
                      result.alert_clinician
                        ? "bg-red-50 border-red-500"
                        : "bg-green-50 border-green-500"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            result.alert_clinician
                              ? "text-red-700"
                              : "text-green-700"
                          }`}
                        >
                          {result.prediction}
                        </h3>
                        <p className="text-slate-600 mt-1">{result.message}</p>
                      </div>
                      {result.alert_clinician ? (
                        <AlertTriangle className="text-red-500 w-6 h-6" />
                      ) : (
                        <CheckCircle className="text-green-500 w-6 h-6" />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/60 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">
                          Response Probability
                        </p>
                        <p className="text-2xl font-mono font-semibold">
                          {(result.probability_of_response * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-white/60 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Dose Intensity</p>
                        <div className="flex items-baseline">
                          <p
                            className={`text-2xl font-mono font-semibold ${
                              result.dose_intensity < 6
                                ? "text-red-600"
                                : "text-slate-800"
                            }`}
                          >
                            {result.dose_intensity.toFixed(2)}
                          </p>
                          <span className="text-sm text-slate-500 ml-1">
                            mg/kg
                          </span>
                          {result.dose_intensity < 6 && (
                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                              Low Dose
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {chartData ? (
                  <ClinicalChart data={chartData} />
                ) : (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/80 p-8">
                    <div className="h-64 w-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 text-center">
                      <div className="p-4 bg-white rounded-2xl shadow-lg mb-4">
                        <BarChart3 className="w-12 h-12 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-700 mb-2">
                        Patient Trajectory
                      </h3>
                      <p className="text-sm text-slate-500 max-w-md">
                        Run analysis to visualize biomarker progression and
                        treatment response
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <BatchUpload />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
