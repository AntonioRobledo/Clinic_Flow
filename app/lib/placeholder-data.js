const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password:'123456',
    },
];

const patients = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Larry David',
        email: 'larry@david.com',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Sam Flynn',
        email: 'sam@flynn.com', 
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        name: 'Sheldon Cooper',
        email: 'sheldon@cooper.com',
    },
];

const patientEHRs= [
    {
        patient_id: patient[0].id,
        birthdate: 'July 2, 1947',
        weight: 130, // pounds
        height: 72, // inches
        blood_type: 'A-positive',
        date: '2024-06-05',
    },
    {
        patient_id: patient[1].id,
        birthdate: 'January 1, 1983',
        weight: 178, 
        height: 74,
        blood_type: 'O-positive',
        date: '2024-06-05',
    },
    {
        patient_id: patient[2].id,
        birthdate: 'February 26, 1980',
        weight: 145,
        height: 73,
        blood_type: 'AB-negative',
        date: '2024-06-05',
    }
]

module.exports = {
    users,
    patients,
    patientEHRs,
};