import React, { } from 'react';
import './App.css';
  
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
  
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminHome'
import UserManagementPage from './pages/UserManagementPage'
import SkillAddPage from './pages/SkillAddPage'
import Home from './pages/Home'
import UserProfile from './pages/UserProfilePage'
import UserSkillForm from './pages/UserSkillPage'
 
function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
     
   
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagementPage />} /> 
            <Route path="skill" element={<SkillAddPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/useraddskill" element={<UserSkillForm />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
   
export default App;
