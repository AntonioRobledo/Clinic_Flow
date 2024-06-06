const { db } = require('vercel/postgres');
const {
    users,
    patients,
    patientEHR,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client/sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the 'users' table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL 
        );
    `;

    console.log('Created "users" table');

    // Insert data into 'users' table
    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    console.log(`Seeded ${insertedUsers.length} users.`);

    return {
        createTable,
        users: insertedUsers,
    };

    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedPatientEHR(client) {
    try { 
        await client.sql`CREATE EXTENSION IF NOT EXISTS 'uuid-ossp'`;

        // Create the 'patientEHR' table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS patientEHRs (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            patient_id UUID NOT NULL, 
            birthdate STRING NOT NULL,
            weight INT NOT NULL,
            height INT NOT NULL,
            blood_type STRING NOT NULL,
            date DATE NOT NULL
        );
    `;

        console.log(`Created 'patientEHRs' table.`);

        // Insert data into the 'patientEHR' table
        const insertedPatientEHRs = await Promise.all(
            patientEHRs.map(
                (patientEHR) => client.sql`
                INSERT INTO patientEHRs (patient_id, birthdate, weight, height, blood_type, date)
                VALUES (${patientEHR.patient_id}, ${patientEHR.birthdate}, ${patientEHR.weight}, ${patientEHR.height}, ${patientEHR.blood_type}, ${patientEHR.date})
                ON CONFLICT (id) DO NOTHING;
            `,
            ),
        );

        console.log(`Seeded ${insertedPatientEHRs.length} patient's electronic health records.`);

        return {
            createTable,
            patientEHRs: insertedPatientEHRs,
        };
    } catch (error) {
        console.error(`Error seeding patients' electronic health records`);
        throw error;
    }
}

async function seedPatients(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS 'uuid-ossp'`;

        // Create the 'patients' table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS patients (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL, 
                email VARCHAR(255) NOT NULL,
            );
            `;

        console.log(`Created 'patients' table`);

        // Insert data into the 'patients' table
        const insertedPatients = await Promise.all(
            customers.map(
                (patient) => client.sql`
                INSERT INTO patients (id, name, email)
                VALUES (${patient.id}, ${patient.name}, ${patient.email})
                ON CONFLICT (id) DO NOTHING;
                `,
            ),
        );

        console.log(`Seeded ${insertedPatients.length} patients.`);

        return { 
            createTable,
            patients: insertedPatients,
        };
    } catch (error) {
        console.error('Error seeding patients', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedPatients(client);
    await seedPatientEHR(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database.',
        err,
    );
});