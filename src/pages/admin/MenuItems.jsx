import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMenuItems, deleteMenuItem } from "../../services/menuService";
import Loading from "../../components/Loading";

export default function MenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    getMenuItems({ search: search || undefined })
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this menu item?")) return;
    await deleteMenuItem(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">Menu Items</h1>
          <p className="text-gray-500 text-sm">Manage your restaurant's menu</p>
        </div>
        <Link to="/admin/menu-items/add" className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full">
          + Add Menu Item
        </Link>
      </div>

      <input
        placeholder="Search menu items..."
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
                <th className="py-3 px-4">Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={item.image?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80"}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td className="text-gray-500">{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded-full ${item.availability ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                      {item.availability ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4">
                    <div className="flex gap-3">
                      <Link to={`/admin/menu-items/edit/${item._id}`} className="text-gray-500 hover:text-primary">✏️</Link>
                      <button onClick={() => handleDelete(item._id)} className="text-gray-500 hover:text-red-500">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No menu items found.
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
