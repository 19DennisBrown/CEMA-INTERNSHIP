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
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.specialisation)
      newErrors.specialisation = "Specialisation is required";
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Valid age is required";
    if (
      !formData.year_joined_hospital ||
      isNaN(formData.year_joined_hospital) ||
      formData.year_joined_hospital <= 0
    )
      newErrors.year_joined_hospital = "Valid year is required";
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
      setErrors({ api: "Failed to create profile. Please try again." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname}</p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname}</p>
          )}
        </div>
        {/* Specialisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Specialisation:
          </label>
          <input
            type="text"
            name="specialisation"
            value={formData.specialisation}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.specialisation && (
            <p className="text-red-500 text-sm">{errors.specialisation}</p>
          )}
        </div>
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Age:
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        {/* Year Joined */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year Joined Hospital:
          </label>
          <input
            type="number"
            name="year_joined_hospital"
            value={formData.year_joined_hospital}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.year_joined_hospital && (
            <p className="text-red-500 text-sm">
              {errors.year_joined_hospital}
            </p>
          )}
        </div>
        {/* API Error */}
        {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}

        <section className="grid grid-cols-2 gap-4">
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Profile
          </button>

          {/* Cancel btn */}
          <button
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  );
};

export default ProfileCreate;
