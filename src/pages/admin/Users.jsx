import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../../services/userService";
import Loading from "../../components/Loading";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    getUsers({ search: search || undefined })
      .then(setUsers)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const toggleRole = async (u) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    if (!confirm(`Change ${u.name}'s role to ${newRole}?`)) return;
    await updateUser(u._id, { role: newRole });
    load();
  };

  const handleDelete = async (u) => {
    if (!confirm(`Delete user ${u.name}?`)) return;
    try {
      await deleteUser(u._id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold">Users</h1>
        <p className="text-gray-500 text-sm">Manage registered users and admins</p>
      </div>

      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm mb-6 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white"
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr className="text-left">
                <th className="py-3 px-4">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined On</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-gray-50">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                      {u.name?.[0]?.toUpperCase()}
                    </span>
                    <span className="font-medium">{u.name}</span>
                  </td>
                  <td className="text-gray-500">{u.email}</td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded-full ${u.role === "admin" ? "bg-orange-50 text-primary" : "bg-blue-50 text-blue-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4">
                    <div className="flex gap-3">
                      <button onClick={() => toggleRole(u)} className="text-xs text-gray-500 hover:text-primary underline">
                        Make {u.role === "admin" ? "User" : "Admin"}
                      </button>
                      <button onClick={() => handleDelete(u)} className="text-gray-500 hover:text-red-500">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
