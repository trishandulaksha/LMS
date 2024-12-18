import React from "react";

const Footer = () => {
  return (
    <footer className="text-white bg-gray-800">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Contact Info */}
          <div className="w-full mb-6 sm:w-1/2 lg:w-1/3">
            <h3 className="mb-2 text-lg font-bold">Contact Us</h3>
            <p>123 Student Progress Way</p>
            <p>Cityville, ST 12345</p>
            <p>Phone: +1 234 567 890</p>
            <p>Email: support@spts.com</p>
          </div>

          {/* Quick Links */}
          <div className="w-full mb-6 sm:w-1/2 lg:w-1/3">
            <h3 className="mb-2 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/grades" className="hover:underline">
                  Grades
                </a>
              </li>
              <li>
                <a href="/Schedule" className="hover:underline">
                  Schedule
                </a>
              </li>
              <li>
                <a href="/StudentProgress" className="hover:underline">
                  Progress
                </a>
              </li>
              <li>
                <a href="/Setting" className="hover:underline">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full mb-6 sm:w-1/2 lg:w-1/3">
            <h3 className="mb-2 text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Student Progress Tracking System. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

