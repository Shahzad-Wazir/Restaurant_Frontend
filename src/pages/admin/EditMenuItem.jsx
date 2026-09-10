import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenuItem, updateMenuItem } from "../../services/menuService";
import Loading from "../../components/Loading";

const categories = ["Starter", "Main Course", "Dessert", "Beverage"];

export default function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuItem(id)
      .then((item) => {
        setForm({
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          availability: item.availability,
        });
        setPreview(item.image?.url || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append("image", image);
      await updateMenuItem(id, fd);
      navigate("/admin/menu-items");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update menu item");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <Loading label="Loading menu item..." />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold mb-1">Edit Menu Item</h1>
      <p className="text-gray-500 text-sm mb-6">Update this dish's details</p>

      {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-500">Image</label>
          <div className="mt-1 flex items-center gap-4">
            {preview && <img src={preview} className="h-16 w-16 rounded-xl object-cover" />}
            <input type="file" accept="image/*" onChange={handleImage} className="text-sm" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500">Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Price (₹)</label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.checked })}
          />
          In stock / available
        </label>

        <div className="flex gap-3">
          <button disabled={saving} className="bg-primary text-white font-semibold px-6 py-2.5 rounded-full disabled:opacity-50">
            {saving ? "Saving..." : "Update Menu Item"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/menu-items")}
            className="bg-gray-100 text-gray-600 font-semibold px-6 py-2.5 rounded-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
