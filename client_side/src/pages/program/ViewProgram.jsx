import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgramView = () => {
    const [programs, setPrograms] = useState([]);
    const [error, setError] = useState('');

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
            } catch (err) {
                console.error('Error fetching programs:', err);
                setError('Failed to load programs.');
            }
        };

        fetchPrograms();
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6">My Health Programs</h2>

            {error && <p className="text-red-500">{error}</p>}

            {programs.length === 0 ? (
                <p className="text-gray-600">No programs found.</p>
            ) : (
                <ul className="space-y-4">
                    {programs.map((program) => (
                        <li key={program.id} className="p-4 border border-gray-200 rounded-md shadow-sm">
                            <h3 className="text-xl font-semibold">{program.title}</h3>
                            <p className="text-sm text-gray-500">
                                Created on: {new Date(program.date_created).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProgramView;
