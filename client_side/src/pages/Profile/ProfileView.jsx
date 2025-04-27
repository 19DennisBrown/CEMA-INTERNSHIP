import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/docProfile/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Could not fetch profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [authTokens]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Loading your profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg shadow mt-6 text-center">
        <div className="text-red-500 font-medium mb-2">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
          onClick={() => navigate(`/profile_update`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Profile
        </button>
      </div>

      <div className="space-y-4">
        <ProfileField label="First Name" value={profile.firstname} />
        <ProfileField label="Last Name" value={profile.lastname} />
        <ProfileField label="Specialization" value={profile.specialisation} />
        <ProfileField label="Age" value={profile.age} />
        <ProfileField label="Years at Hospital" value={new Date().getFullYear() - profile.year_joined_hospital} />
      </div>

    <section className="grid">
      <button className="border-2 border-green-200 text-green-200 rounded-md px-4 grid place-items-center font-bold w-24" onClick={()=>navigate(-1)} >exit</button>
    </section>
    </div>

  );
};

// Reusable component for profile fields
const ProfileField = ({ label, value }) => (
  <div className="border-b border-gray-100 pb-3">
    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</div>
    <div className="mt-1 text-lg font-semibold text-gray-800">{value || "-"}</div>
  </div>
);

export default ProfileView;