import React from "react";
import FadeInOnScroll from "../fadein/FadeInOnScroll";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  const addresses = [
    {
      street: "No.423, Brough Road, near Savitha Bus Stop",
      city: "Erode 638001",
      hours: "Mon-Sun: 9AM-10PM",
    },
    {
      street: "No.218, near Crocs Showroom, opp to Sales Tax Office",
      city: "Erode 638001",
      hours: "Mon-Sun: 9AM-10PM",
    },
    {
      street: "No.117, Old Bus Stand Road, near Green Trends",
      city: "Perundurai 638052",
      hours: "Mon-Sun: 9AM-10PM",
    },
  ];

  return (
    <FadeInOnScroll threshold={0.1}>
      <footer className="px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:block lg:space-x-2">
          {/* Logo and Tagline */}
          <div className="lg:w-1/4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/assets/logo.png"
                alt="OnlyBaby"
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-rose-600 font-light">
              Creating magical moments for your little ones
            </p>
          </div>

          {/* Main Sections */}
          <div className="block gap-8 lg:w-full space-y-6 ">
            {/* Store Locations */}
            <div className="space-y-4 lg:w-full">
              <h3 className="text-lg font-semibold tracking-wider text-rose-700 uppercase">
                Visit Us
              </h3>
              <div className=" md:flex items-center justify-center gap-4 space-y-3 pr-4 ">
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="p-4  rounded-lg h-full bg-white shadow-md hover:shadow-lg transition-shadow border-l-4 border-rose-500 "
                  >
                    <p className="font-medium text-rose-800">
                      {address.street}, {address.city}
                    </p>
                    <p className="text-sm text-rose-500 mt-2">
                      {address.hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Developers Section */}
            <div className="space-y-3 lg:w-1/4">
              <h3 className="text-lg font-semibold tracking-wider text-rose-700 uppercase">
                Developers
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://sanjeevikumarwd.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    Sanjeevikumar
                  </a>
                </li>
                <li>
                  <a
                    href="https://sanjeevikumarwd.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    Keerthivasan
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-3 lg:w-1/4">
              <h3 className="text-lg font-semibold tracking-wider text-rose-700 uppercase">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6 text-rose-600" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-rose-600" />
                </a>

                {/* Mobile */}
                <a
                  href="tel:+1234567890"
                  className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
                  aria-label="Mobile"
                >
                  <Phone className="w-6 h-6 text-rose-600" />
                </a>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Follow us for updates and special offers!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="py-6 text-center border-t border-rose-100">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} OnlyBaby. All rights reserved.
          </p>
        </div>
      </footer>
    </FadeInOnScroll>
  );
};

export default Footer;
