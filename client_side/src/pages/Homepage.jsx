// import  {useState, useEffect, useContext} from 'react'
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileView from "./Profile/ProfileView";
import CreateProgram from "./program/CreateProgram";
import ViewProgram from "./program/ViewProgram";
import AddPatient from "./patient/AddPatient";
import ViewPatients from "./patient/ViewPatients";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen">
      <section className=" w-full grid  ">
        <Header />
      </section>

      <section className="mt-12 p-6 w-full mx-auto bg-white shadow-md rounded-lg">
        <button
          className="bg-white px-4 rounded-md border-2 border-green-500"
          onClick={() => navigate("/profile_create")}
        >
          Add Profile
        </button>

        <section className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="">
            <ProfileView />
          </div>
          <div className="">
            <ViewProgram />
          </div>
        </section>
          <div className=" w-full overflow-scroll sm:overflow-hidden  h-96">
            <ViewPatients />
          </div>

        <hr className="border-3 w-full border-green-500" />
        <section className="grid sm:grid-cols-2 grid-cols-1 gap-8">
          <CreateProgram />
          <AddPatient />
        </section>
      </section>
      < Footer />
    </div>
  );
};

export default HomePage;
