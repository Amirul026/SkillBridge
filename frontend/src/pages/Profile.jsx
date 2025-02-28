import { useEffect, useState } from "react";
import { getProfile, updateProfile, logout } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Edit, Save, X } from "lucide-react";

const Profile = ({ isDarkMode }) => {
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
        navigate("/login");
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
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  if (!user) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-4 ${isDarkMode ? 'border-white border-t-transparent' : 'border-gray-900 border-t-transparent'}`} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <div className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold">My Profile</h2>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                  <img
                    src={user.picture || "/api/placeholder/128/128"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-grow">
                {editMode ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3 py-2 rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } border focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        className={`w-full px-3 py-2 rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } border opacity-50`}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3 py-2 rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } border focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90 transition-colors"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className={`flex items-center px-4 py-2 rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <p className="text-lg">{user.phone || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Role</label>
                      <p className="text-lg">{user.role}</p>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center px-4 py-2 bg-[#1e1a53] text-white rounded-md hover:bg-[#1e1a53]/90  transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center px-4 py-2 rounded-md ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;