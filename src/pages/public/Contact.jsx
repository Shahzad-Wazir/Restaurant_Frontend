import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="text-center">
        <p className="text-primary font-medium">Contact Us</p>

        <h1 className="text-4xl font-extrabold mt-2">
          We'd Love to Hear From You
        </h1>

        <p className="text-gray-500 mt-3">
          Have a question or feedback? Get in touch with us.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-12">

        {/* Contact Info */}
        <div className="bg-[#0d0d0d] text-white rounded-3xl p-8">

          <h2 className="text-2xl font-bold">
            Get in Touch
          </h2>

          <p className="text-gray-400 mt-3">
            Feel free to contact us anytime. Our team will get back to you
            as soon as possible.
          </p>

          <div className="mt-8 space-y-6">

            <div>
              <p className="text-primary text-sm">Email</p>
              <p className="mt-1">support@tastybites.com</p>
            </div>

            <div>
              <p className="text-primary text-sm">Phone</p>
              <p className="mt-1">+91 98765 43210</p>
            </div>

            <div>
              <p className="text-primary text-sm">Address</p>
              <p className="mt-1">
                Kolkata, West Bengal, India
              </p>
            </div>

          </div>

        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm"
        >

          <h2 className="text-2xl font-bold mb-6">
            Send us a Message
          </h2>

          {submitted && (
            <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg mb-4">
              Message sent successfully! We'll get back to you soon.
            </p>
          )}

          <div className="space-y-4">

            <div>
              <label className="text-sm text-gray-500">
                Full Name
              </label>

              <input
                required
                type="text"
                placeholder="Your name"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Email
              </label>

              <input
                required
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Message
              </label>

              <textarea
                required
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition"
            >
              Send Message
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}