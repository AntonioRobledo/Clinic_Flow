import { sql } from '@vercel/postgres';
import { 
    User,
    Patient, 
    PatientEHR,
    PatientEHRsTable,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { off } from 'process';

export async function fetchPatients() {
    try {
        const data = await sql<Patient>`
        SELECT
            id, 
            name
        FROM patients
        ORDER BY name ASC
        `;

        const patients = data.rows;
        return patients;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all patients.');
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredPatientEHRs(

    query: string,
    currentPage: number,
)
{
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const patientEHRs = await sql<PatientEHRsTable>`
        SELECT
            patientEHRs.id,
            patientEHRs.patient_id,
            patientEHRs.birthdate,
            patientEHRs.weight,
            patientEHRs.height,
            patientEHRs.blood_type,
            patientEHRs.date,
            patients.name, 
            patients.email,
        FROM patientEHRs
        JOIN patients ON patientEHRs.patient_id = patient.id
        WHERE 
            patients.name ILIKE ${`%${query}%`} OR 
            patients.email ILIKE ${`%${query}%`} OR
            patientEHRs.birthdate::text ILIKE ${`%${query}%`} OR
            patientEHRs.weight::text ILIKE ${`%${query}%`} OR
            patientEHRs.height::text ILIKE ${`%${query}%`} OR
            patientEHRs.blood_type::text ILIKE ${`%${query}%`}
        ORDER BY patientEHRs.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

        return patientEHRs.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch patients' health records.`);
    }
}

export async function fetchEhrPages(query: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
        FROM patientEHRs
        JOIN patients ON patientEHRs.patient_id = patient.id
        WHERE
            patient.name ILIKE ${`${query}%`} OR
            patient.email ILIKE ${`${query}%`} OR
            patientEHRs.birthdate::text ILIKE ${`${query}%`} OR
            patientEHRs.weight::text ILIKE ${`${query}%`} OR 
            patientEHRs.height::text ILIKE ${`${query}%`} OR
            patientEHRs.blood_type::text ILIKE ${`${query}%`} OR
            patientEHRs.date::text ILIKE ${`${query}%`}
        `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error ('Failed to fetch total number of health records.');
    }
}

export async function fetchEhrById(id: string) {
    noStore();
    try {
        const data = await sql<PatientEHR>`
        SELECT 
            patientEHRs.id,
            patientEHRs.patient_id,
            patientEHRs.birthdate,
            patientEHRs.weight,
            patientEHRs.height,
            patientEHRs.blood_type,
        FROM patientEHRs
        WHERE patientEHRs.id = ${id};
        `;

        const healthRecord = data.rows.map((healthRecord) => ({
            ...healthRecord,
        }));

        console.log(healthRecord); 
        return healthRecord[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch heatlh record.');
    }
}

export async function getUser(email: string) {
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}