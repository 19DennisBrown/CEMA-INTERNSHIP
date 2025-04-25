

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/Homepage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Registerpage';
import Header from './components/Header';
import ProfileCreate from './pages/Profile/ProfileCreate';
import ProfileUpdate from './pages/Profile/ProfileUpdate';
import ProfileView from './pages/Profile/ProfileView';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />

            {/* Profile routes */}
            <Route path="/profile_create" element={<ProfileCreate/>} />
            <Route path="/profile_view" element={<ProfileView />} />
            <Route path="/profile_update" element={<ProfileUpdate />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;