import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteProgram = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
            await axios.delete(`http://localhost:8000/program/${id}/delete/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/'); 
        } catch (err) {
            console.error('Error deleting program:', err.response?.data || err.message);
            setError('Failed to delete program.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md text-center">
            <h2 className="text-2xl font-bold mb-4">Delete Program</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            {!confirm ? (
                <>
                    <p className="mb-6">Are you sure you want to delete this program? This action cannot be undone.</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setConfirm(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <p className="mb-4 text-red-600 font-semibold">Confirm Deletion?</p>
                    <button
                        onClick={handleDelete}
                        className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 transition"
                    >
                        Confirm Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteProgram;
