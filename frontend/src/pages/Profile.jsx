import { useEffect, useState } from "react";
import { getProfile, updateProfile, logout } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Import CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
        setFormData(userData);
      } catch (error) {
        toast.error("Failed to load profile.");
        navigate("/login"); // Redirect to login if not authenticated
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setUser(formData);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <img src={user.picture || "/default-avatar.png"} alt="Profile" className="profile-image" />
        {editMode ? (
          <form onSubmit={handleUpdate} className="profile-form">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              value={formData.email}
              disabled
            />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <button type="submit" className="update-button">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button onClick={() => setEditMode(true)} className="edit-button">Edit Profile</button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
