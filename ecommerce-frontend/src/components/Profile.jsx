import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLog} from "../context/LoginContext"

function Profile() {
  const navigate = useNavigate();
  // Dummy user data; in real-world use context/API
  const {user,logout}=useLog();
  const [tuser, setUser] = useState(user);

  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    // Simulate profile update
    setUser(form);
    setEditMode(false);
    alert("Profile updated!");
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    // Simulate password change
    alert("Password changed!");
    setPasswords({ current: "", new: "", confirm: "" });
    setPasswordMode(false);
  };

  const logoutUser = () => {
    localStorage.removeItem("token"); 
    alert("Logged out!");
    logout();
    navigate("/login");
  };

  return (
    <section className=" flex justify-center items-start min-h-screen  bg-gray-100 !py-[10rem] !px-4">
      <div className=" w-[100%] md:w-[60%] mx-auto bg-white shadow-md rounded-xl !p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">User Profile</h2>

        {!editMode ? (
          <div className="space-y-2 text-[150%]">
            <p><strong>First Name:</strong> {user.name}</p>
            <p><strong>Address :</strong> {user.addr}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white !px-4 !py-2 rounded-md mt-4"
              onClick={() => setEditMode(true)}
            >
              Update Profile
            </button>
            <br />
            <br />
          </div>
        ) : (
          <form onSubmit={updateProfile} className="space-y-4 flex flex-col gap-[1.4rem]">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleProfileChange}
              placeholder="Full Name"
              className="border !p-2 rounded-md  fields2"
            />
            <input
              type="text"
              name="addr"
              value={form.addr}
              onChange={handleProfileChange}
              placeholder="Address"
              className="border !p-2 rounded-md fields2"
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleProfileChange}
              placeholder="Address"
              className="border !p-2 rounded-md fields2"
            />
            
            <select
              name="role"
              value={form.role}
              onChange={handleProfileChange}
              className="border !p-2 rounded-md fields2"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="developer">Developer</option>
            </select>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white !px-4 !py-2 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white !px-4 !py-2 rounded-md"
                onClick={() => {
                  setEditMode(false);
                  setForm(user);
                }}
              >
                Cancel
              </button>
            </div>
            <br />
          </form>
        )}

        {!passwordMode ? (
          <div>
            <button
            className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white !px-4 !py-2 rounded-md w-full"
            onClick={() => setPasswordMode(true)}
          >
            Change Password
          </button>
          <br /><br />
          </div>
          
        ) : (
          <form onSubmit={changePassword} className="space-y-4 flex flex-col gap-[1.4rem]">
            <input
              type="password"
              name="current"
              placeholder="Current Password"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="border !p-2 rounded-md w-full"
              required
            />
            <input
              type="password"
              name="new"
              placeholder="New Password"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="border !p-2 rounded-md w-full"
              required
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm New Password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="border !p-2 rounded-md w-full"
              required
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white !px-4 !py-2 rounded-md"
              >
                Update Password
              </button>
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white !px-4 !py-2 rounded-md"
                onClick={() => {
                  setPasswordMode(false);
                  setPasswords({ current: "", new: "", confirm: "" });
                }}
              >
                Cancel
              </button>
            </div>
            <br />
          </form>
        )}
      
        <button
          className="bg-indigo-800 hover:bg-indigo-950 text-white !px-4 !py-2 rounded-md w-full"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Profile;

