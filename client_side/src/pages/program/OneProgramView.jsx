import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OneProgramView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [program, setProgram] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
                const response = await axios.get(`http://localhost:8000/program/${id}/view/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProgram(response.data);
            } catch (err) {
                console.error('Error fetching program:', err.response?.data || err.message);
                setError('Failed to load program details.');
            }
        };

        fetchProgram();
    }, [id]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    if (!program) {
        return <div className="text-center mt-10">Loading program...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{program.title}</h2>
            <p className="text-gray-700 mb-2">
                <strong>Program ID:</strong> {program.id}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Date Created:</strong> {new Date(program.date_created).toLocaleString()}
            </p>

            <section className="grid grid-cols-3 gap-2 mt-4">
                <button className="border-1 border-gray-500 text-gray-500 rounded-md px-4"  onClick={()=>navigate(-1)}>Exit</button>
                <button className="border-1 border-green-500 text-green-500 rounded-md px-4"onClick={()=>navigate(`/update_program/${program.id}`)}>update</button>
                <button className="border-1 border-red-500 text-red-500 rounded-md px-4"    onClick={()=>navigate(`/delete_program/${program.id}`)}>delete</button>
            </section>


        </div>
    );
};

export default OneProgramView;
