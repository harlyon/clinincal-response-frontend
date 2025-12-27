export interface User {
    name: string;
    role: string;
    institution: string;
    timestamp: string;
}

export interface TopNavigationProps {
    mode: 'single' | 'batch'
    user: User
    handleLogout: () => void
}

export interface SideBarProps {
    mode: 'single' | 'batch'
    setMode: (mode: 'single' | 'batch') => void
}

export interface PredictionResponse {
    prediction: string;
    probability_of_response: number;
    dose_intensity: number;
    alert_clinician: boolean;
    message: string;
}

export interface BatchResult {
    patient_id: string;
    prediction: string;
    probability_of_response: number;
    dose_intensity: number;
    alert_clinician: boolean;
    message: string;
}

export interface PatientData {
    age: number;
    sex: string;
    weight_kg: number;
    baseline_severity: number;
    biomarker_day0: number;
    biomarker_day1: number;
    biomarker_day2: number;
    biomarker_day3: number;
    biomarker_day4: number;
    biomarker_day5: number;
}
