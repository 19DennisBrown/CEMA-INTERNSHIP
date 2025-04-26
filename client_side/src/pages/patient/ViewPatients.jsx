import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const ViewPatients = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
                const response = await axios.get('http://localhost:8000/patient/view/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setPatients(response.data);
                // console.log("fetched:", response.data)
            } catch (err) {
                console.error('Error fetching patients:', err);
                setError('Failed to fetch patients.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) return <p>Loading patients...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Your Patients</h2>
            {patients.length === 0 ? (
                <p>No patients found.</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">First Name</th>
                            <th className="border p-2">Last Name</th>
                            <th className="border p-2">Insurance Code</th>
                            <th className="border p-2">Program</th>
                            <th className="border p-2">Date Created</th>
                            <th className="border p-2"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id} className="text-center" onClick={ ()=> navigate(`/view_patient/${patient.id}`)}>
                                <td className="border p-2">{patient.first_name}</td>
                                <td className="border p-2">{patient.last_name}</td>
                                <td className="border p-2">{patient.insurance_code}</td>
                                <td className="border p-2">{patient.health_program_title}</td>
                                <td className="border p-2">{new Date(patient.date_created).toLocaleDateString()}</td>
                                <td className="border p-2">
                                    <button className="border-1 border-green-600 rounded-md px-2" onClick={ ()=> navigate(`/view_patient/${patient.id}`)}> Click</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewPatients;
