export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-extrabold text-xl text-white">
            Tasty<span className="text-primary">Bites</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Good Food, Happy People</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Home</li>
            <li>Menu</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Follow Us</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Subscribe to our Newsletter</p>
          <div className="flex">
            <input
              placeholder="Enter your email"
              className="bg-transparent border border-gray-600 rounded-l-full px-4 py-2 text-sm w-full outline-none"
            />
            <button className="bg-primary px-4 py-2 rounded-r-full text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} TastyBites. All rights reserved.
      </div>
    </footer>
  );
}
