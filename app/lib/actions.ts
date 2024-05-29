'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
/* import Form from '../ui/patients/create-form'; */
import { signIn } from '@/auth';
import AuthError from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';
                    default:
                        return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const FormSchema = z.object({
    id: z.string(),
    patientId: z.string({
        invalid_type_error: 'Please select a patient,',
    }),
    date: z.string(),
});

const CreatePatient = FormSchema.omit({ id: true, date: true});
const UpdatePatient = FormSchema.omit({ id: true, date: true});

export type State = {
    errors?: {
        patientId?: string[];
    };
    message?: string | null;
};

export async function createPatient(prevState: State, formData: FormData) {
    const validatedFields = CreatePatient.safeParse({ 
        patientId: formData.get('patientId'),
    });

    // if form validation fails, return errors early. Otherwise, continue. 
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Patient.',
        };
    }
    // Prepare data for insertion into the database 
    const {patientId} = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    // Insert into the database
    try {
        await sql`
        INSERT INTO invoices (patient_id, date)
        VALUES (${patientId}, ${date})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Patient.',
        };
    }
        revalidatePath('/dashboard/patients');
        redirect('/dashboard/patients');
    }

export async function updatePatient(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdatePatient.safeParse({
        patientId: formData.get('patientId'),
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Patient.',
        };
    }

    const { patientId } = validatedFields.data;

    try {
        await sql`
        UPDATE patients
        SET patient_id = ${patientId}
        WHERE id = ${id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Patient.',
        };
    }
        revalidatePath('dashboard/patients');
        redirect('/dashboard/patients');
}

export async function deletePatient(id: string) {
    await sql`
        DELETE FROM invoices 
        WHERE id = ${id}
        `;
    revalidatePath('/dashboard/patients');
}