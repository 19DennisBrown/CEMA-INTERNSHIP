import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
            await axios.delete(`http://localhost:8000/patient/${id}/delete/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Patient deleted successfully!');
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting patient:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Are you sure you want to delete this patient?</h2>
            <div className="space-x-4">
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Confirm Delete
                </button>
                <button
                    onClick={() => navigate('/patient/view')}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeletePatient;
