import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import EmployeesPage from './pages/Admin/EmployeesPage';
import AddJobPage from './pages/Admin/AddJobPage';
import JobsPage from './pages/Employee/JobsPage';
import Signup from './pages/Signup';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" />; 
  }
  return <Outlet />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        
        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/employees" element={<EmployeesPage />} />
          <Route path="/admin/add-job" element={<AddJobPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route path="/jobs" element={<JobsPage />} />
          {/* <Route path="/companyshowcase" element={<CompanyShowcase />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}