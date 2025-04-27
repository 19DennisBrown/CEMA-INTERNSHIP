import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCreditCard, FiPlusCircle, FiArrowLeft } from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';

const AddPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        insuranceCode: '',
        healthProgram: ''
    });
    const [programs, setPrograms] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [programsLoading, setProgramsLoading] = useState(true);

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
                setErrors({...errors, programs: 'Failed to load programs'});
            } finally {
                setProgramsLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const patientData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            insurance_code: formData.insuranceCode,
            health_program: formData.healthProgram,
        };

        try {
            const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
            const response = await axios.post(
                'http://localhost:8000/patient/create/', 
                patientData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            if (response.status === 201) {
                navigate("/");
            }
        } catch (error) {
            console.error('Error adding patient:', error.response?.data);
            setErrors({ 
                ...errors, 
                api: error.response?.data?.message || 'Failed to add patient. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mt-12 mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center text-white hover:text-blue-100 transition-colors"
                        >
                            <FiArrowLeft className="mr-2" /> Back
                        </button>
                        <h2 className="text-2xl font-bold flex items-center">
                            <FiUser className="mr-2" /> New Patient
                        </h2>
                        <div className="w-8"></div> {/* Spacer for alignment */}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* First Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiUser />
                            </div>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="John"
                                required
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiUser />
                            </div>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>

                    {/* Insurance Code */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Insurance Code</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiCreditCard />
                            </div>
                            <input
                                type="text"
                                name="insuranceCode"
                                value={formData.insuranceCode}
                                onChange={handleChange}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="INS12345678"
                                required
                            />
                        </div>
                    </div>

                    {/* Health Program */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Health Program</label>
                        {programsLoading ? (
                            <div className="flex justify-center py-4">
                                <PulseLoader color="#3B82F6" size={10} />
                            </div>
                        ) : (
                            <select
                                name="healthProgram"
                                value={formData.healthProgram}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">-- Select a Program --</option>
                                {programs.map((program) => (
                                    <option key={program.id} value={program.id}>
                                        {program.title}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors.programs && (
                            <p className="text-red-500 text-sm mt-1">{errors.programs}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {errors.api && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <p className="text-red-700">{errors.api}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                        >
                            {loading ? (
                                <>
                                    <PulseLoader color="#ffffff" size={8} className="mr-2" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FiPlusCircle className="mr-2" />
                                    Add Patient
                                </>
                            )}
                        </button>
                    </div>
                </form>
                
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
      </div>
        </div>
    );
};

export default AddPatient;