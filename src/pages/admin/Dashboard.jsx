import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { getDashboardStats } from "../../services/menuService";
import Loading from "../../components/Loading";

const COLORS = {
  Starter: "#ef4444",
  "Main Course": "#f59e0b",
  Dessert: "#22c55e",
  Beverage: "#3b82f6",
};

const StatCard = ({ icon, label, value, bg }) => (
  <div className={`rounded-2xl p-5 ${bg}`}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xl">{icon}</span>

      <p className="text-sm text-gray-600">
        {label}
      </p>
    </div>

    <p className="text-2xl font-extrabold">
      {value}
    </p>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return <Loading label="Loading dashboard..." />;
  }

  const pieData = Object.entries(stats.categories).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-extrabold">
          Welcome back,
          {" "}
          <span className="text-primary">
            Admin!
          </span>
        </h1>

        <p className="text-gray-500 text-sm">
          Manage your restaurant from one place.
        </p>
      </div>


      {/* Statistics */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

        <StatCard
          icon="🍽️"
          label="Total Menu Items"
          value={stats.totalMenuItems}
          bg="bg-red-50"
        />

        <StatCard
          icon="👥"
          label="Total Users"
          value={stats.totalUsers}
          bg="bg-blue-50"
        />

        <StatCard
          icon="🛒"
          label="Total Orders"
          value={stats.totalOrders}
          bg="bg-green-50"
        />

      </div>


      {/* Recent Menu + Category Chart */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Menu Items */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">

          <div className="flex justify-between items-center mb-4">

            <p className="font-semibold">
              Recent Menu Items
            </p>

            <Link
              to="/admin/menu-items"
              className="text-primary text-sm font-medium"
            >
              View All →
            </Link>

          </div>


          {stats.recentMenuItems.length === 0 ? (

            <p className="text-sm text-gray-500">
              No menu items added yet.
            </p>

          ) : (

            <table className="w-full text-sm">

              <thead>

                <tr className="text-left text-gray-400 border-b border-gray-100">

                  <th className="py-2">
                    Name
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {stats.recentMenuItems.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-gray-50"
                  >

                    <td className="py-3 font-medium">
                      {item.name}
                    </td>

                    <td className="text-gray-500">
                      {item.category}
                    </td>

                    <td>
                      ₹{item.price}
                    </td>

                    <td>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.availability
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >

                        {item.availability
                          ? "In Stock"
                          : "Out of Stock"}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>


        {/* Category Chart */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6">

          <p className="font-semibold mb-4">
            Menu Items by Category
          </p>


          <ResponsiveContainer
            width="100%"
            height={200}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
              >

                {pieData.map((entry) => (

                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>


          <ul className="text-sm space-y-2 mt-2">

            {pieData.map((item) => (

              <li
                key={item.name}
                className="flex items-center justify-between"
              >

                <span className="flex items-center gap-2">

                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: COLORS[item.name],
                    }}
                  />

                  {item.name}

                </span>


                <span className="font-medium">
                  {item.value}
                </span>

              </li>

            ))}

          </ul>

        </div>

      </div>


      {/* Recent Users + Quick Actions */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Users */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">

          <div className="flex justify-between items-center mb-4">

            <p className="font-semibold">
              Recent Users
            </p>

            <Link
              to="/admin/users"
              className="text-primary text-sm font-medium"
            >
              View All →
            </Link>

          </div>


          {stats.recentUsers.length === 0 ? (

            <p className="text-sm text-gray-500">
              No users registered yet.
            </p>

          ) : (

            <table className="w-full text-sm">

              <thead>

                <tr className="text-left text-gray-400 border-b border-gray-100">

                  <th className="py-2">
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Role
                  </th>

                </tr>

              </thead>


              <tbody>

                {stats.recentUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b border-gray-50"
                  >

                    <td className="py-3 font-medium">
                      {user.name}
                    </td>

                    <td className="text-gray-500">
                      {user.email}
                    </td>

                    <td>

                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">

                        {user.role}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>


        {/* Quick Actions */}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">

          <p className="font-semibold mb-2">
            Quick Actions
          </p>


          <Link
            to="/admin/menu-items/add"
            className="block bg-primary text-white text-sm font-semibold text-center py-2.5 rounded-xl"
          >

            + Add Menu Item

          </Link>


          <Link
            to="/admin/users"
            className="block bg-gray-100 text-sm font-semibold text-center py-2.5 rounded-xl"
          >

            Manage Users

          </Link>


          <Link
            to="/admin/menu-items"
            className="block bg-gray-100 text-sm font-semibold text-center py-2.5 rounded-xl"
          >

            View Menu Items

          </Link>

        </div>

      </div>

    </div>
  );
}