import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-white bg-gray-700">
      {/* Smaller Container with Centering */}
      <div className="container max-w-3xl px-4 mx-auto text-center">
        {/* Contact & Links in a Single Row */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          {/* Contact Info */}
          <div>
            <h3 className="font-bold">Contact Us</h3>
            <p>Student Progress Way</p>
            <p>Fairfield Garden</p>
            <p>Colombo</p>
            <p>(+94) ( 011) 2695879</p>
            <p>support@spts.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <ul className="space-y-1">
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
          <div>
            <h3 className="font-bold">Follow Us</h3>
            <div className="flex justify-center space-x-3">
              <a href="https://facebook.com" className="hover:text-blue-500">
                Facebook
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400">
                Twitter
              </a>
              <a href="https://instagram.com" className="hover:text-pink-500">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-3 border-gray-700" />

        {/* Copyright */}
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Student Progress Tracking System.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
