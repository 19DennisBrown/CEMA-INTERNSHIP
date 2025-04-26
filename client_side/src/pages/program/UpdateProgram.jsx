import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProgram = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
                const response = await axios.get(`http://localhost:8000/program/${id}/view/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTitle(response.data.title);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching program:', err.response?.data || err.message);
                setError('Failed to fetch program.');
                setLoading(false);
            }
        };

        fetchProgram();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
            await axios.put(`http://localhost:8000/program/${id}/update/`, 
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate('/'); 
        } catch (err) {
            console.error('Error updating program:', err.response?.data || err.message);
            setError('Failed to update program.');
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading program...</div>;
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Update Program</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Program Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Update Program
                </button>
            </form>
        </div>
    );
};

export default UpdateProgram;
