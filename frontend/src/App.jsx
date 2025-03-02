import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CoursesPage from './pages/CoursesPage';
import Profile from "./pages/Profile";
import MentorDashboard from "./pages/MentorDashboard";
import LearnerDashboard from "./pages/LearnerDashboard";
import CreateCourse from "./pages/CreateCourse";
import MentorCoursesPage from "./pages/MentorCoursesPage";
import ChatPage from "./pages/ChatPage"; // Import the ChatPage
import LeaderboardPage from "./pages/LeaderboardPage"; // Import the LeaderboardPage
import IndividualCoursePage from "./pages/IndividualCoursePage"; // Import the IndividualCoursePage
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { isAuthenticated } from './services/authService';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Layout>
          {({ isDarkMode }) => (
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
              <Route path="/register" element={<Register isDarkMode={isDarkMode} />} />
              <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
              <Route path="/forgot-password" element={<ForgotPassword isDarkMode={isDarkMode} />} />
              
              <Route path="/courses" element={<CoursesPage isDarkMode={isDarkMode} />} />
              
              <Route path="/seminar" element={<div>Seminar Page</div>} />
              <Route path="/help" element={<div>Help Center</div>} />
              <Route path="/terms" element={<div>Terms of Service</div>} />
              <Route path="/privacy" element={<div>Privacy Policy</div>} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  isAuthenticated() ? (
                    <Profile isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated() ? (
                    <Navigate to={localStorage.getItem('userRole') === 'Mentor' ? '/mentor-dashboard' : '/learner-dashboard'} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/mentor-dashboard"
                element={
                  isAuthenticated() && localStorage.getItem('userRole') === 'Mentor' ? (
                    <MentorDashboard isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/learner-dashboard"
                element={
                  isAuthenticated() && localStorage.getItem('userRole') === 'Learner' ? (
                    <LearnerDashboard isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/create-course"
                element={
                  isAuthenticated() && localStorage.getItem('userRole') === 'Mentor' ? (
                    <CreateCourse isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/mentor-courses"
                element={
                  isAuthenticated() && localStorage.getItem('userRole') === 'Mentor' ? (
                    <MentorCoursesPage isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/chat"
                element={
                  isAuthenticated() ? (
                    <ChatPage isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/leaderboard"
                element={
                  isAuthenticated() ? (
                    <LeaderboardPage isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/learning/:courseId"
                element={
                  isAuthenticated() ? (
                    <IndividualCoursePage isDarkMode={isDarkMode} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-4">404</h1>
                      <p className="text-lg">Page not found</p>
                    </div>
                  </div>
                }
              />
            </Routes>
          )}
        </Layout>
      </Router>
    </>
  );
};

export default App;