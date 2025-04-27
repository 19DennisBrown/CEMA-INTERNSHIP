import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiLoader, FiAlertCircle } from "react-icons/fi";

const ProgramView = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("authTokens"))?.access;
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/program/view/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPrograms(response.data);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Failed to load programs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [navigate]);

  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProgramClick = (programId) => {
    navigate(`/view_program/${programId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <FiLoader className="animate-spin text-3xl text-blue-500 mb-4" />
        <p className="text-gray-600">Loading your health programs...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Health Programs</h2>
          <p className="text-gray-600">Manage and view your health programs</p>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search programs..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center">
          <FiAlertCircle className="text-red-500 mr-2" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {filteredPrograms.length === 0 ? (
        <div className="text-center py-12">
          {programs.length === 0 ? (
            <>
              <p className="text-gray-600 mb-4">You don't have any health programs yet.</p>
              <button
                onClick={() => navigate("/create_program")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create New Program
              </button>
            </>
          ) : (
            <p className="text-gray-600">No programs match your search.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
              onClick={() => handleProgramClick(program.id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{program.title}</h3>
                <FiArrowRight className="text-gray-400 mt-1" />
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FiCalendar className="mr-1" />
                <span>Created: {new Date(program.date_created).toLocaleDateString()}</span>
              </div>
              {program.description && (
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {program.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramView;