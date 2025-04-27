

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/Homepage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Registerpage';
import ProfileCreate from './pages/Profile/ProfileCreate';
import ProfileUpdate from './pages/Profile/ProfileUpdate';
import ProfileView from './pages/Profile/ProfileView';
import AddPatient from './pages/patient/AddPatient';
import ViewPatients from './pages/patient/ViewPatients';
import OnePatientView from './pages/patient/OnePatientView';
import CreateProgram from './pages/program/CreateProgram';
import ProgramView from './pages/program/ViewProgram';
import PatientUpdate from './pages/patient/PatientUpdate';
import DeletePatient from './pages/patient/DeletePatient';
import OneProgramView from './pages/program/OneProgramView';
import UpdateProgram from './pages/program/UpdateProgram';
import DeleteProgram from './pages/program/DeleteProgram';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />

            {/* Profile routes */}
            <Route path="/profile_create" element={<ProfileCreate/>} />
            <Route path="/profile_view" element={<ProfileView />} />
            <Route path="/profile_update" element={<ProfileUpdate />} />

            {/* Program Routes */}
            <Route path="/create_program" element={<CreateProgram />} />
            <Route path="/view_programs" element={<ProgramView />} />
            <Route path="/view_program/:id" element={<OneProgramView />} />
            <Route path="/update_program/:id" element={<UpdateProgram />} />
            <Route path="/delete_program/:id" element={<DeleteProgram />} />

            {/* Patient Routes */}
            <Route path="/add_patient" element={<AddPatient />} />
            <Route path="/view_patients" element={<ViewPatients />} />
            <Route path="/view_patient/:id" element={<OnePatientView />} />
            <Route path="/update_patient/:id" element={<PatientUpdate />} />
            <Route path="/delete_patient/:id" element={<DeletePatient />} />

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;