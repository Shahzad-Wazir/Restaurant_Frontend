export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-primary font-medium">About TastyBites</p>

        <h1 className="text-4xl font-extrabold mt-2">
          Good Food, Happy People
        </h1>

        <p className="text-gray-500 mt-5 leading-7">
          Welcome to TastyBites! We believe that great food brings people
          together. Our mission is to provide delicious and fresh food for
          everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">🍽️</div>
          <h2 className="font-bold text-lg">Delicious Food</h2>
          <p className="text-sm text-gray-500 mt-2">
            Carefully selected dishes made with quality ingredients.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">🌱</div>
          <h2 className="font-bold text-lg">Fresh Ingredients</h2>
          <p className="text-sm text-gray-500 mt-2">
            We focus on fresh and high-quality ingredients.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">❤️</div>
          <h2 className="font-bold text-lg">Happy Customers</h2>
          <p className="text-sm text-gray-500 mt-2">
            Customer satisfaction is always our top priority.
          </p>
        </div>

      </div>

      <div className="mt-16 bg-[#0d0d0d] rounded-3xl p-10 text-center text-white">
        <h2 className="text-3xl font-extrabold">
          Our Mission
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mt-4">
          Our goal is to make discovering delicious food simple, enjoyable,
          and accessible for everyone.
        </p>
      </div>

    </div>
  );
}