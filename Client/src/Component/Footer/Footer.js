import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 text-white bg-gray-800">
      {/* Responsive Container */}
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-bold">Contact Us</h3>
          <p>123 Student Progress Way</p>
          <p>Cityville, ST 12345</p>
          <p>Phone: +1 234 567 890</p>
          <p>Email: support@spts.com</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/grades" className="hover:underline">
                Grades
              </a>
            </li>
            <li>
              <a href="/schedule" className="hover:underline">
                Schedule
              </a>
            </li>
            <li>
              <a href="/StudentProgress" className="hover:underline">
                Progress
              </a>
            </li>
            <li>
              <a href="/setting" className="hover:underline">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-bold">Follow Us</h3>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="my-6 border-gray-700" />

      {/* Copyright */}
      <div className="text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Student Progress Tracking System.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
