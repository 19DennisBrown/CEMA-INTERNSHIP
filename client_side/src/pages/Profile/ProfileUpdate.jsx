import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const { authTokens } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    specialisation: "",
    age: "",
    year_joined_hospital: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/docProfile/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setErrors({ api: "Failed to load profile. Please try again." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [authTokens]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.specialisation.trim())
      newErrors.specialisation = "Specialisation is required";
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Please enter a valid age";
    if (
      !formData.year_joined_hospital ||
      isNaN(formData.year_joined_hospital)
    ) {
      newErrors.year_joined_hospital = "Please enter a valid year";
    } else if (formData.year_joined_hospital > new Date().getFullYear()) {
      newErrors.year_joined_hospital = "Year cannot be in the future";
    }
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
      await axios.put("http://127.0.0.1:8000/docProfile/update/", formData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrors({ api: "Failed to update profile. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Update Your Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Keep your information up to date for better service
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {errors.api && (
              <div className="mb-6 p-4 bg-red-50 rounded-md">
                <p className="text-red-600">{errors.api}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 rounded-md">
                <p className="text-green-600">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-md border ${
                      errors.firstname
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } shadow-sm`}
                    placeholder="John"
                  />
                  {errors.firstname && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstname}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-md border ${
                      errors.lastname
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } shadow-sm`}
                    placeholder="Doe"
                  />
                  {errors.lastname && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastname}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="specialisation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Specialisation *
                  </label>
                  <input
                    id="specialisation"
                    type="text"
                    name="specialisation"
                    value={formData.specialisation}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-md border ${
                      errors.specialisation
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } shadow-sm`}
                    placeholder="Cardiology"
                  />
                  {errors.specialisation && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.specialisation}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age *
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-md border ${
                      errors.age
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } shadow-sm`}
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="year_joined_hospital"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Year Joined Hospital *
                  </label>
                  <input
                    id="year_joined_hospital"
                    type="number"
                    name="year_joined_hospital"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.year_joined_hospital}
                    onChange={handleChange}
                    className={`block w-full px-4 py-2 rounded-md border ${
                      errors.year_joined_hospital
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } shadow-sm`}
                  />
                  {errors.year_joined_hospital && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.year_joined_hospital}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
