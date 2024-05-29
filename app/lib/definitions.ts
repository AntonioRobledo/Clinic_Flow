export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Patient = {
    id: string;
    name: string;
    email: string;
}

export type PatientEHR = {
    id: string;
    patient_id: string;
    birthdate: string;
    weight: number;
    height: number;
    blood_type: string;
    date: string;
}