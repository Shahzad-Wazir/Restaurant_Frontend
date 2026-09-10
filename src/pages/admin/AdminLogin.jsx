import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(form.email, form.password);
      if (data.role !== "admin") {
        setError("This account doesn't have admin access.");
        return;
      }
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-[#171717] text-white rounded-3xl p-8 border border-white/10">
        <div className="text-center mb-6">
          <span className="text-3xl">🍳</span>
          <h1 className="text-xl font-extrabold mt-2">
            Tasty<span className="text-primary">Bites</span> Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1">Sign in to manage your restaurant</p>
        </div>

        {error && <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2 mb-4">{error}</p>}

        <label className="text-xs font-medium text-gray-400">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mt-1 mb-4 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary"
          placeholder="admin@tastybites.com"
        />

        <label className="text-xs font-medium text-gray-400">Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mt-1 mb-6 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary"
          placeholder="••••••••"
        />

        <button
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-full hover:bg-primary-dark transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login to Dashboard"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-5">
          Not an admin? <Link to="/login" className="text-primary">Customer login</Link>
        </p>
      </form>
    </div>
  );
}
