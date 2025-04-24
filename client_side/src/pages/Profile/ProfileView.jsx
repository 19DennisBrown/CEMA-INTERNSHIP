import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext'; 

const ProfileView = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/docProfile/', {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`
                    }
                });
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Could not fetch profile. Make sure it exists.');
            }
        };

        fetchProfile();
    }, [authTokens]);

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    if (!profile) {
        return <div className="text-center mt-4">Loading profile...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <p><strong>First Name:</strong> {profile.firstname}</p>
            <p><strong>Last Name:</strong> {profile.lastname}</p>
            <p><strong>Specialisation:</strong> {profile.specialisation}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Year Joined Hospital:</strong> {profile.year_joined_hospital}</p>
        </div>
    );
};

export default ProfileView;
