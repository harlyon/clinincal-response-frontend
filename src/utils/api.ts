import type {
  BatchResult,
  PatientData,
  PredictionResponse,
} from "../types/types";
import config from "../config";

export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${config.api.baseUrl}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export const uploadBatchCsv = async (file: File): Promise<BatchResult[]> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const fileContent = await file.text();
    const lines = fileContent.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    const needsConversion = headers.some((h) => h.startsWith("biomarker_day"));

    if (needsConversion) {
      const newHeaders = headers.map((header) => {
        if (header.startsWith("biomarker_day")) {
          const day = header.replace("biomarker_day", "");
          return `Biomarker_Day${day}`;
        }
        return header === "age"
          ? "Age"
          : header === "sex"
            ? "Sex"
            : header === "weight_kg"
              ? "Weight_Kg"
              : header === "baseline_severity"
                ? "Baseline_Severity"
                : header;
      });

      lines[0] = newHeaders.join(",");
      const blob = new Blob([lines.join("\n")], { type: "text/csv" });
      formData.set("file", new File([blob], file.name, { type: "text/csv" }));
    }

    const response = await fetch(
      `${config.api.baseUrl}${config.api.endpoints.predictBatch}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to process batch file");
    }

    const results = await response.json();

    if (!Array.isArray(results)) {
      throw new Error("Invalid response format from server");
    }

    return results as BatchResult[];
  } catch (error) {
    console.error("Batch upload error:", error);
    throw error;
  }
};

export const predictResponse = async (
  data: PatientData,
): Promise<PredictionResponse> => {
  const apiPayload = {
    ...data,
    sex: data.sex.toLowerCase(),
  };

  const response = await fetch(
    `${config.api.baseUrl}${config.api.endpoints.predict}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    },
  );

  if (!response.ok) {
    let errorMessage = `API request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch (e) {
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};
