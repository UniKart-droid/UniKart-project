import React, { useState } from "react";
import Footer from "./Footer"; 
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Data:", formData);

   

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    
    <div className="min-h-screen bg-white pt-20">
      
      <div className="px-6 md:px-16 pb-12">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          
          
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Get in Touch
            </h2>

            <p className="text-gray-600">
              Reach out to us for any queries regarding buying, selling or using UniKart.
            </p>

            <div className="space-y-4 text-gray-900 font-medium">
              <p>📍 Location: Dharamshala</p>
              <p>📧 Email: rajputridhi92@gmail.com</p>
              
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50">
            
            {submitted && (
              <p className="text-green-600 mb-4 font-bold">
                Message sent successfully!
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block mb-1 font-bold text-black">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-bold text-black">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
                  placeholder="Enter your email"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-1 font-bold text-black">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-black"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-md"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
};

export default Contact;