import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProfileCreate = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    specialisation: "",
    age: "",
    year_joined_hospital: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.specialisation.trim()) newErrors.specialisation = "Specialisation is required";
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Please enter a valid age";
    const currentYear = new Date().getFullYear();
    if (
      !formData.year_joined_hospital ||
      isNaN(formData.year_joined_hospital) ||
      formData.year_joined_hospital <= 1900 ||
      formData.year_joined_hospital > currentYear
    )
      newErrors.year_joined_hospital = `Please enter a year between 1900 and ${currentYear}`;
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/docProfile/create/",
        JSON.stringify(formData),
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setErrors({ 
        api: error.response?.data?.message || "Failed to create profile. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full mt-12   sm:p-18 p-4 bg-white rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Complete Your Profile</h1>
        <p className="text-gray-600 mt-2">
          Please fill in your details to create your doctor profile
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.api && (
          <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{errors.api}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="John"
            />
            {errors.firstname && (
              <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
            )}
          </div>
          
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Doe"
            />
            {errors.lastname && (
              <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
            )}
          </div>
        </div>

        {/* Specialisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialisation *
          </label>
          <input
            type="text"
            name="specialisation"
            value={formData.specialisation}
            onChange={handleChange}
            className={`mt-1 block w-full px-4 py-2 border ${errors.specialisation ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Cardiology"
          />
          {errors.specialisation && (
            <p className="mt-1 text-sm text-red-600">{errors.specialisation}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="22"
              max="100"
              className={`mt-1 block w-full px-4 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="35"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age}</p>
            )}
          </div>
          
          {/* Year Joined */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Joined Hospital *
            </label>
            <input
              type="number"
              name="year_joined_hospital"
              value={formData.year_joined_hospital}
              onChange={handleChange}
              min="1900"
              max={currentYear}
              className={`mt-1 block w-full px-4 py-2 border ${errors.year_joined_hospital ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder={currentYear}
            />
            {errors.year_joined_hospital && (
              <p className="mt-1 text-sm text-red-600">{errors.year_joined_hospital}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : 'Create Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileCreate;