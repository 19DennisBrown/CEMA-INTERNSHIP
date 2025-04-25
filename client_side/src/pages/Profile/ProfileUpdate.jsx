import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
    const { authTokens } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        specialisation: '',
        age: '',
        year_joined_hospital: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/docProfile/', {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`
                    }
                });
                setFormData(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setErrors({ api: 'Failed to load profile. Please try again.' });
            }
        };
        fetchProfile();
    }, [authTokens]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstname) newErrors.firstname = 'First name is required';
        if (!formData.lastname) newErrors.lastname = 'Last name is required';
        if (!formData.specialisation) newErrors.specialisation = 'Specialisation is required';
        if (!formData.age || isNaN(formData.age) || formData.age <= 0) newErrors.age = 'Valid age is required';
        if (!formData.year_joined_hospital || isNaN(formData.year_joined_hospital)) newErrors.year_joined_hospital = 'Valid year is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.put('http://127.0.0.1:8000/docProfile/update/', formData, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            });
            navigate('/');
        } catch (err) {
            console.error('Error updating profile:', err);
            setErrors({ api: 'Failed to update profile. Please try again.' });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
            <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['firstname', 'lastname', 'specialisation', 'age', 'year_joined_hospital'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700">
                            {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                        </label>
                        <input
                            type={field === 'age' || field === 'year_joined_hospital' ? 'number' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                    </div>
                ))}
                {errors.api && <p className="text-red-500 text-sm mt-1">{errors.api}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileUpdate;
