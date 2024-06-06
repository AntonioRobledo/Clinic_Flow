import { LargeNumberLike } from "crypto";
import { StringValidation } from "zod";

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
};

export type PatientEHR = {
    id: string;
    patient_id: string;
    birthdate: string;
    weight: number;
    height: number;
    blood_type: string;
    date: string;
};

export type PatientField = {
    id: string;
    name: string;
};

export type PatientEHRsTable = {
    id: string;
    patient_id: string;
    name: string;
    email: string;
    birthdate: string;
    weight: number;
    height: number;
    blood_type: string;
    date: string;
}

export type PatientTableType = {
    id: string;
    name: string;
    email: string;
};