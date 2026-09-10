import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/admin/menu-items", label: "Menu Items", icon: "🍽️" },
  { to: "/admin/menu-items/add", label: "Add Menu Item", icon: "➕" },
  { to: "/admin/users", label: "Users", icon: "👥" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[#f7f5f2]">
      <aside className="w-64 bg-[#0d0d0d] text-gray-300 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-6 py-6">
          <span className="text-2xl">🍳</span>
          <div>
            <p className="font-extrabold text-white leading-none">
              Tasty<span className="text-primary">Bites</span>
            </p>
            <p className="text-[10px] text-gray-500">Good Food, Happy People</p>
          </div>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-6">
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-end gap-4 bg-white px-8 py-4 border-b border-gray-100">
          <span className="text-xl">🔔</span>
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </span>
            <span className="text-sm font-medium">{user?.name || "Admin"}</span>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
