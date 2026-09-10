import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(form.email, form.password);
      navigate(data.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-extrabold text-center">
          Welcome to Tasty<span className="text-primary">Bites</span>
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">Login to continue</p>

        {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>}

        <label className="text-xs font-medium text-gray-500">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mt-1 mb-4 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          placeholder="you@example.com"
        />

        <label className="text-xs font-medium text-gray-500">Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mt-1 mb-6 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          placeholder="••••••••"
        />

        <button
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-full hover:bg-primary-dark transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-5">
          Don't have an account? <Link to="/register" className="text-primary font-medium">Sign Up</Link>
        </p>
        <p className="text-xs text-gray-400 text-center mt-3">
          Admin? <Link to="/admin/login" className="text-primary">Login here</Link>
        </p>
      </form>
    </div>
  );
}
