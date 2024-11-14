import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const courseEnrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Courses Enrolled',
        data: [50, 100, 150, 200, 250, 300, 350],
        backgroundColor: '#001f3d',
        borderColor: '#001f3d',
        borderWidth: 1,
      },
    ],
  };

  const studentEnrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Students Enrolled',
        data: [200, 300, 400, 500, 600, 700, 800],
        backgroundColor: '#4BC0C0',
        borderColor: '#4BC0C0',
        borderWidth: 1,
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container-fluid" style={{ height: '100vh', width: '100vw' }}>
      <div className="row h-100">
        <div className="col-md-2 p-3 bg-dark text-white" style={{ position: 'fixed', height: '100vh' }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                <div className="sidebar-option">
                  <i className="bi bi-house-door-fill"></i> Dashboard
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/courses">
                <div className="sidebar-option">
                  <i className="bi bi-book-fill"></i> Courses
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/communication">
                <div className="sidebar-option">
                  <i className="bi bi-chat-dots-fill"></i> Communication
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/revenue">
                <div className="sidebar-option">
                  <i className="bi bi-wallet2"></i> Revenue
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/students">
                <div className="sidebar-option">
                  <i className="bi bi-person-fill"></i> Student Details
                </div>
              </Link>
            </li>
          </ul>
          <div className="mt-auto">
            <button
              className="btn btn-outline-light w-100 mt-4"
              style={{ backgroundColor: '#001f3d', borderColor: '#ffffff' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="col-md-10 offset-md-2 p-3" style={{ marginLeft: '16.6667%' }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">E-Learning Dashboard</a>
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="btn btn-primary mx-2" to="/add-admin" style={{ backgroundColor: '#001f3d' }}>Add Admin</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary mx-2" to="/add-mentor" style={{ backgroundColor: '#001f3d' }}>Add Mentor</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary mx-2" to="/add-course" style={{ backgroundColor: '#001f3d' }}>Add Course</Link>
                </li>
              </div>
            </div>
          </nav>

          <div className="row g-4 mt-5">
            <div className="col-md-3">
              <div className="card text-white" style={{ backgroundColor: '#001f3d' }}>
                <div className="card-body">
                  <h5 className="card-title">Total Students</h5>
                  <p className="card-text" style={{ fontSize: '2rem' }}>1500</p>
                  <Link className="btn btn-light mt-2" to="/students" style={{ backgroundColor: '#001f3d' }}>
                    View Students
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-white" style={{ backgroundColor: '#4BC0C0' }}>
                <div className="card-body">
                  <h5 className="card-title">Total Courses</h5>
                  <p className="card-text" style={{ fontSize: '2rem' }}>120</p>
                  <Link className="btn btn-light mt-2" to="/courses" style={{ backgroundColor: '#4BC0C0' }}>
                    View Courses
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-white" style={{ backgroundColor: '#001f3d' }}>
                <div className="card-body">
                  <h5 className="card-title">Total Mentors</h5>
                  <p className="card-text" style={{ fontSize: '2rem' }}>75</p>
                  <Link className="btn btn-light mt-2" to="/mentors" style={{ backgroundColor: '#001f3d' }}>
                    View Mentors
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-white" style={{ backgroundColor: '#4BC0C0' }}>
                <div className="card-body">
                  <h5 className="card-title">Total Admins</h5>
                  <p className="card-text" style={{ fontSize: '2rem' }}>10</p>
                  <Link className="btn btn-light mt-2" to="/admins" style={{ backgroundColor: '#4BC0C0' }}>
                    View Admins
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Course Enrollment
                </div>
                <div className="card-body">
                  <Bar data={courseEnrollmentData} />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Student Enrollment
                </div>
                <div className="card-body">
                  <Bar data={studentEnrollmentData} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
