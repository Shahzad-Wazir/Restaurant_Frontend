import { Link } from "react-router-dom";

export default function MenuCard({ item }) {
  const fallback =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
      
      <div className="h-40 overflow-hidden">
        <img
          src={item.image?.url || fallback}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-ink text-lg">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-primary text-lg">
            ₹{item.price}
          </span>

          <Link
            to={`/menu/${item._id}`}
            className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-primary-dark transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}