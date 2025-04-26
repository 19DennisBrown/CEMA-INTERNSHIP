import { useEffect, useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [insuranceCode, setInsuranceCode] = useState('');
    const [healthProgram, setHealthProgram] = useState('');
    const [programs, setPrograms] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
                const response = await axios.get('http://localhost:8000/program/view/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPrograms(response.data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        fetchPrograms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patientData = {
            first_name: firstName,
            last_name: lastName,
            insurance_code: insuranceCode,
            health_program: healthProgram, // Pass program ID here
        };

        try {
            const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
            const response = await axios.post('http://localhost:8000/patient/create/', patientData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Patient added:', response.data);
            setFirstName('');
            setLastName('');
            setInsuranceCode('');
            setHealthProgram('');
        } catch (error) {
            console.error('Error adding patient:', error.response?.data);
            setErrors({ api: 'Something went wrong. Check inputs or try again.' });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Insurance Code</label>
                    <input
                        type="text"
                        value={insuranceCode}
                        onChange={(e) => setInsuranceCode(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Health Program</label>
                    <select
                        value={healthProgram}
                        onChange={(e) => setHealthProgram(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">-- Select a Program --</option>
                        {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.title}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add Patient
                </button>
            </form>
        </div>
    );
};

export default AddPatient;
