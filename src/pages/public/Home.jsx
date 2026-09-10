import { useEffect, useState } from "react";
import { getMenuItems } from "../../services/menuService";
import MenuCard from "../../components/MenuCard";
import Loading from "../../components/Loading";

const categories = ["All", "Starter", "Main Course", "Dessert", "Beverage"];

export default function Home() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getMenuItems({
      category: category === "All" ? undefined : category,
    })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0d0d0d] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <p className="text-primary text-sm italic mb-2">
              Good Food, Happy People
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Delicious Food,{" "}
              <span className="text-primary">
                Delivered Fresh
              </span>
            </h1>

            <p className="text-gray-400 mt-4 max-w-md">
              Explore a variety of mouth-watering dishes made with
              fresh ingredients and discover your favorite flavors.
            </p>

            <a
              href="#menu"
              className="inline-block mt-6 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition"
            >
              Explore Menu →
            </a>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=80"
              alt="Delicious Burger"
              className="rounded-3xl w-full h-80 object-cover"
            />
          </div>

        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold">
            Browse Our Menu
          </h2>

          <p className="text-gray-500 mt-1">
            Find your favorite food from our menu categories
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                category === c
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {loading ? (
          <Loading label="Loading menu..." />
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">
            No menu items found in this category yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <MenuCard
                key={item._id}
                item={item}
              />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}