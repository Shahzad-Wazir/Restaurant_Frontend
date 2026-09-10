import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMenuItem } from "../../services/menuService";
import Loading from "../../components/Loading";

export default function MenuDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuItem(id)
      .then(setItem)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading label="Loading item..." />;

  if (!item) {
    return (
      <p className="text-center py-20 text-gray-500">
        Menu item not found.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
      <img
        src={
          item.image?.url ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"
        }
        alt={item.name}
        className="rounded-3xl w-full h-96 object-cover"
      />

      <div>
        <Link to="/menu" className="text-sm text-primary">
          ← Back to Menu
        </Link>

        <h1 className="text-3xl font-extrabold mt-3">
          {item.name}
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          {item.category}
        </p>

        <p className="text-gray-600 mt-4">
          {item.description}
        </p>

        <p className="text-3xl font-bold text-primary mt-6">
          ₹{item.price}
        </p>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">
            Availability
          </p>

          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              item.availability
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {item.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
}