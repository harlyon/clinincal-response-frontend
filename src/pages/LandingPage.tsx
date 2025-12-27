import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  User,
  Shield,
  Stethoscope,
  ArrowRight,
  ClipboardCheck,
  Heart,
  Brain,
  Pill,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function LandingPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("nurse");
  const [institution, setInstitution] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    const userData = {
      name: name.trim(),
      role,
      institution: institution.trim(),
      timestamp: new Date().toISOString(),
    };
    login(userData);

    navigate("/dashboard", { replace: true, state: { user: userData } });
  };

  useEffect(() => {
    const isNameValid = name.trim().length >= 5;
    setIsValid(isNameValid && institution.trim().length > 0);
  }, [name, institution]);

  const getValidationMessage = () => {
    if (!touched) return null;
    if (name.trim().length === 0) return "Please enter your name";
    if (name.trim().length < 5) return "Name must be at least 5 characters";
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 font-sans text-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-cyan-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-emerald-100 rounded-full opacity-40 blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Branding and Hero */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-8 lg:mb-0">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">MediDash</h1>
              <p className="text-xs text-slate-600">
                Clinical Intelligence Platform
              </p>
            </div>
          </div>

          <div className="max-w-lg mx-auto lg:mx-0 lg:mt-16">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 uppercase tracking-wider">
                HIPAA Compliant
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Clinical Response
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Prediction Dashboard
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              Advanced AI-powered tool for predicting patient response to
              treatment. Used by leading hospitals to optimize clinical
              outcomes.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/80">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Heart className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Patient Safety
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/80">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Brain className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  AI-Powered
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/80">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Validated
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/80">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Pill className="w-4 h-4 text-violet-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Dose Optimization
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block text-sm text-slate-500">
            <p>© 2024 MediDash Clinical Analytics. All rights reserved.</p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="lg:w-1/2">
          <div className="h-full bg-white/80 backdrop-blur-sm border-l border-slate-200/80 shadow-2xl shadow-slate-900/5">
            <div className="h-full p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <div className="inline-flex p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl mb-4">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Access Clinical Dashboard
                  </h2>
                  <p className="text-slate-600">
                    Please verify your credentials to continue
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setTouched(true);
                        }}
                        onBlur={() => setTouched(true)}
                        className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-offset-1 transition-all ${
                          touched &&
                          name.trim().length < 5 &&
                          name.trim().length > 0
                            ? "border-red-300 focus:ring-red-500 bg-red-50/50"
                            : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />
                    </div>
                    {touched && (
                      <div className="mt-2">
                        <p
                          className={`text-sm ${
                            name.trim().length >= 5
                              ? "text-green-600"
                              : name.trim().length === 0
                                ? "text-slate-500"
                                : "text-red-600"
                          }`}
                        >
                          {name.trim().length === 0
                            ? "Minimum 5 characters required"
                            : `${name.trim().length}/5 characters`}
                          {name.trim().length >= 5 && " ✓"}
                        </p>
                        {getValidationMessage() && (
                          <p className="text-xs text-red-600 mt-1">
                            {getValidationMessage()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Role
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole("nurse")}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          role === "nurse"
                            ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20"
                            : "border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              role === "nurse"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-medium">Nurse</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("doctor")}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          role === "doctor"
                            ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20"
                            : "border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              role === "doctor"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <span className="font-medium">Doctor</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Institution Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Medical Institution
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Hospital or clinic name"
                      autoComplete="organization"
                    />
                  </div>

                  {/* Terms and Privacy */}
                  <div className="flex items-start gap-3 p-4 bg-slate-50/80 rounded-xl">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="terms" className="text-sm text-slate-600">
                      I agree to the Terms of Service and acknowledge that this
                      tool is for clinical decision support only. I understand
                      that all patient data should be de-identified.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      isValid && !isSubmitting
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 active:scale-[0.99] shadow-lg shadow-blue-500/25"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying credentials...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Access Dashboard
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </button>

                  <div className="text-center pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      This is a demonstration tool. For clinical use, please
                      contact your system administrator.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
