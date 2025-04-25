// import  {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProfileView from './Profile/ProfileView';
import CreateProgram from './program/CreateProgram';
import ViewProgram from './program/ViewProgram';

const HomePage = () => {
   const navigate = useNavigate();
    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <p className="text-lg font-semibold text-gray-700 mb-4">You are logged into the home page!</p>

            <button className="bg-white px-4 rounded-md border-2 border-green-500" onClick={()=>navigate('/profile_create')} >Add Profile</button>

            <section className="grid grid-cols-2">
               <div className="">
            < ProfileView />
               </div>
               <div className="">
                < ViewProgram />
               </div>
            </section>
            <hr className="border-3 w-full border-green-500" />
            < CreateProgram />
        </div>

    )
}

export default HomePage