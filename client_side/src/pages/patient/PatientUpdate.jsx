import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PatientUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        insurance_code: '',
    });
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
                setFormData({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    insurance_code: response.data.insurance_code,
                });
            } catch (err) {
                console.error('Error fetching patient:', err);
                setError('Could not fetch patient details.');
            }
        };

        fetchPatient();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
            await axios.patch(`http://localhost:8000/patient/${id}/update/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            navigate('/'); 
        } catch (err) {
            console.error('Error updating patient:', err);
            setError('Failed to update patient.');
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-4">Update Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Insurance Code:</label>
                    <input
                        type="text"
                        name="insurance_code"
                        value={formData.insurance_code}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Update Patient
                </button>
            </form>
        </div>
    );
};

export default PatientUpdate;
