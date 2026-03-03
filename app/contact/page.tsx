import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f7f1e6]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#f7f1e6] to-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out anytime!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-[#4f6b4f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 90000 12345</p>
                  <p className="text-gray-600">+91 90000 67890</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-[#4f6b4f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@bakerydelights.com</p>
                  <p className="text-gray-600">support@bakerydelights.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#4f6b4f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">Road No. 12, Banjara Hills</p>
                  <p className="text-gray-600">Hyderabad, Telangana 500034</p>
                  <p className="text-gray-600">India</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-[#4f6b4f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 7:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sat: 8:00 AM - 9:00 PM</p>
                  <p className="text-gray-600">Sun: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none transition"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4f6b4f] focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us what you think..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4f6b4f] to-[#3f5a3f] hover:from-[#3f5a3f] hover:to-[#2f4a2f] text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
