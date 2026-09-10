import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
      >
        <h1 className="text-2xl font-extrabold text-center">
          Create your account
        </h1>

        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Join TastyBites today
        </p>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <label className="text-xs font-medium text-gray-500">
          Full Name
        </label>

        <input
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full mt-1 mb-4 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          placeholder="Shahzad"
        />

        <label className="text-xs font-medium text-gray-500">
          Email
        </label>

        <input
          type="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full mt-1 mb-4 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          placeholder="you@example.com"
        />

        <label className="text-xs font-medium text-gray-500">
          Password
        </label>

        <input
          type="password"
          required
          minLength={6}
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full mt-1 mb-4 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          placeholder="At least 6 characters"
        />

        <label className="text-xs font-medium text-gray-500">
          Confirm Password
        </label>

        <input
          type="password"
          required
          minLength={6}
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
          className="w-full mt-1 mb-6 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          placeholder="Re-enter your password"
        />

        <button
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-full hover:bg-primary-dark transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}