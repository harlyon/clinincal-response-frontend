import React, { useState } from "react";
import { FileText, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import type { BatchResult } from "../types/types";
import { uploadBatchCsv } from "../utils/api";

const BatchUpload: React.FC = () => {
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const results = await uploadBatchCsv(e.target.files[0]);
        setBatchResults(results);
      } catch (err) {
        console.error("Error uploading CSV:", err);
        alert(
          `Error processing file: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      } finally {
        setUploading(false);
      }
    }
  };

  const downloadCsvTemplate = () => {
    const csvContent = `age,sex,weight_kg,baseline_severity,biomarker_day0,biomarker_day1,biomarker_day2,biomarker_day3,biomarker_day4,biomarker_day5
45,M,75.5,7,10.2,9.8,9.0,8.2,7.5,6.8
52,F,68.0,8,5.1,5.3,5.4,5.5,5.6,5.7`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "patient_data_template.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Batch Patient Analysis
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Upload CSV file with patient data
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={downloadCsvTemplate}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FileText className="w-4 h-4" />
                Download CSV Template
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="border-3 border-dashed border-slate-300/80 rounded-2xl p-8 sm:p-12 text-center bg-gradient-to-b from-slate-50/50 to-white">
            <div className="inline-flex p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl mb-6">
              <Upload className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Upload Patient Cohort CSV
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              Required columns: age, sex, weight_kg, biomarker_day0...day5,
              baseline_severity
            </p>
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                id="batch-upload"
              />
              <label
                htmlFor="batch-upload"
                className={`w-full py-12 px-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  uploading
                    ? "bg-slate-50 border-slate-200"
                    : "bg-white hover:bg-slate-50 border-slate-300"
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <span className="text-sm text-slate-600">
                      Processing file...
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-slate-400 mb-3" />
                    <span className="text-sm font-medium text-slate-700">
                      Choose a CSV file or drag it here
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      Supports .csv files only
                    </span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-slate-500 mt-4">Max file size: 10MB</p>
          </div>

          {uploading && (
            <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-blue-700">
                  Processing file...
                </span>
              </div>
              <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          )}

          {batchResults.length > 0 && (
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Batch Results
                  </h3>
                  <p className="text-sm text-slate-500">
                    {batchResults.length} patients analyzed
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    Export CSV
                  </button>
                  <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50/80 backdrop-blur-sm">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-slate-700">
                          Patient ID
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-700">
                          Prediction
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-700">
                          Confidence
                        </th>
                        <th className="px6 py-4 text-left font-semibold text-slate-700">
                          Dose Intensity
                        </th>
                        <th className="px6 py-4 text-left font-semibold text-slate-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {batchResults.map((row, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center text-slate-700 font-medium">
                                {row.patient_id.charAt(0)}
                              </div>
                              <span className="font-medium text-slate-900">
                                {row.patient_id}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full ${
                                row.prediction === "Responder"
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
                                  : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200"
                              }`}
                            >
                              {row.prediction === "Responder" ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <AlertTriangle className="w-3 h-3" />
                              )}
                              {row.prediction}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">
                                {(row.probability_of_response * 100).toFixed(1)}
                                %
                              </span>
                              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                  style={{
                                    width: `${row.probability_of_response * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-mono font-medium ${
                                  row.dose_intensity < 6
                                    ? "text-red-600"
                                    : "text-slate-900"
                                }`}
                              >
                                {row.dose_intensity.toFixed(2)}
                                <span className="text-xs text-slate-500 ml-1">
                                  mg/kg
                                </span>
                              </span>
                              {row.dose_intensity < 6 && (
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {row.alert_clinician ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
                                <AlertTriangle className="w-3 h-3" />
                                ALERT
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                                <CheckCircle className="w-3 h-3" />
                                OK
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchUpload;
