import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const initials = user?.name?.[0]?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍳</span>

          <div className="leading-tight">
            <p className="font-extrabold text-lg">
              Tasty<span className="text-primary">Bites</span>
            </p>

            <p className="text-[10px] text-gray-400 -mt-1">
              Good Food, Happy People
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>

          <Link to="/menu" className="hover:text-primary transition">
            Menu
          </Link>

          <Link to="/about" className="hover:text-primary transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-primary transition">
            Contact
          </Link>

        </nav>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full bg-orange-50 pl-1 pr-3 py-1"
              >
                <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                  {initials}
                </span>

                <span className="text-sm font-medium">
                  {user.name}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 text-sm">
                  
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition"
              >
                Sign Up
              </Link>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}