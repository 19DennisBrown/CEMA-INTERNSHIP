// import  {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProfileView from './Profile/ProfileView';
import CreateProgram from './program/CreateProgram';
import ViewProgram from './program/ViewProgram';
import AddPatient from './patient/AddPatient';
import ViewPatients from './patient/ViewPatients';

const HomePage = () => {
   const navigate = useNavigate();
    return (
        <div className="mt-12 p-6 w-full mx-auto bg-white shadow-md rounded-lg">
            <p className="text-lg font-semibold text-gray-700 mb-4">You are logged into the home page!</p>

            <button className="bg-white px-4 rounded-md border-2 border-green-500" onClick={()=>navigate('/profile_create')} >Add Profile</button>

            <section className="grid grid-cols-2 gap-4">
               <div className="">
            < ProfileView />
               </div>
               <div className="">
                < ViewProgram />
               </div>
               <div className="">
                < ViewPatients />
               </div>
            </section>

            <hr className="border-3 w-full border-green-500" />
            <section className="grid grid-cols-2 gap-8" >
                < CreateProgram />
                < AddPatient />
            </section>
        </div>

    )
}

export default HomePage