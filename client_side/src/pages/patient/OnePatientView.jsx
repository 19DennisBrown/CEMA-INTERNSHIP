import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OnePatientView = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
                const response = await axios.get(`http://localhost:8000/patient/${id}/view/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatient(response.data);
            } catch (err) {
                console.error('Failed to fetch patient:', err);
                setError('Could not load patient details.');
            }
        };

        fetchPatient();
    }, [id]);

    if (error) return <p className="text-red-500">{error}</p>;

    if (!patient) return <p>Loading patient...</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
            <p><strong>First Name:</strong> {patient.first_name}</p>
            <p><strong>Last Name:</strong> {patient.last_name}</p>
            <p><strong>Insurance Code:</strong> {patient.insurance_code}</p>
            <p><strong>Program:</strong> {patient.health_program_title}</p>
            <p><strong>Date Created:</strong> {new Date(patient.date_created).toLocaleString()}</p>

            <section className="grid grid-cols-3 gap-2 mt-4">
                <button className="border-1 border-green-400 text-green-500 px-4 rounded-md " onClick={()=>navigate(-1)} >Exit</button>
                <button className="border-1 border-orange-400 text-orange-500 px-4 rounded-md " onClick={()=>navigate(`/update_patient/${patient.id}`)} >Update</button>
                <button className="border-1 border-red-400 px-4 rounded-md text-red-500" onClick={()=>navigate(`/delete_patient/${patient.id}`)} >Delete</button>
            </section>
        </div>
    );
};

export default OnePatientView;
