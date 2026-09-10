import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as authService from "../../services/authService";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwMessage, setPwMessage] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault();
    const updated = await authService.updateProfile({ name });
    setUser({ ...user, name: updated.name });
    setMessage("Profile updated");
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setPwMessage("");
    try {
      await authService.changePassword(pwForm);
      setPwMessage("Password changed successfully");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwMessage(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-14 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your account details</p>
      </div>

      <form onSubmit={saveProfile} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold">Profile Info</h2>
        <div>
          <label className="text-xs font-medium text-gray-500">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Email</label>
          <input disabled value={user?.email} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-400" />
        </div>
        {message && <p className="text-sm text-green-600">{message}</p>}
        <button className="bg-primary text-white font-semibold px-6 py-2 rounded-full">Save</button>
      </form>

      <form onSubmit={changePassword} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold">Change Password</h2>
        <input
          type="password"
          placeholder="Current password"
          required
          value={pwForm.currentPassword}
          onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="New password"
          required
          minLength={6}
          value={pwForm.newPassword}
          onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
        />
        {pwMessage && <p className="text-sm text-gray-600">{pwMessage}</p>}
        <button className="bg-primary text-white font-semibold px-6 py-2 rounded-full">Update Password</button>
      </form>
    </div>
  );
}
