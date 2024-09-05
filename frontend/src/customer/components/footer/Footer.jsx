// import { p, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-6 md:p-12 bg-black text-gray-200 w-full">
      <div className="w-full flex flex-col md:flex-row justify-around space-y-8 md:space-y-0">
        {/* Company Section */}
        <div className="text-center w-full md:w-1/4">
          <h2 className="text-2xl mb-6 font-bold text-yellow-300">Company</h2>
          <div className="flex flex-col gap-2 items-center">
            {["About Us", "Blog", "Jobs", "Press", "Partners"].map((item) => (
              <p
                key={item}
                className="text-lg cursor-pointer hover:text-yellow-400 font-medium border-b-[1px] border-black hover:border-b-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Solutions Section */}
        <div className="text-center w-full md:w-1/4">
          <h2 className="text-2xl mb-6 font-bold text-yellow-300">Solutions</h2>
          <div className="flex flex-col gap-2 items-center">
            {[
              "Marketing",
              "Analytics",
              "Commerce",
              "Insights",
              "Support Team",
            ].map((item) => (
              <p
                key={item}
                className="text-lg cursor-pointer hover:text-yellow-400 font-medium border-b-[1px] border-black hover:border-b-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Documentation Section */}
        <div className="text-center w-full md:w-1/4">
          <h2 className="text-2xl mb-6 font-bold text-yellow-300">
            Documentation
          </h2>
          <div className="flex flex-col gap-2 items-center">
            {["Guides and Tutorials", "API Status & Docs"].map((item) => (
              <p
                key={item}
                className="text-lg cursor-pointer hover:text-yellow-400 font-medium border-b-[1px] border-black hover:border-b-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Legal Section */}
        <div className="text-center w-full md:w-1/4">
          <h2 className="text-2xl mb-6 font-bold text-yellow-300">Legal</h2>
          <div className="flex flex-col gap-2 items-center">
            {[
              "Claim",
              "Privacy Policy",
              "Terms & Conditions",
              "Cookies Policy",
              "License",
            ].map((item) => (
              <p
                key={item}
                className="text-lg cursor-pointer hover:text-yellow-400 font-medium border-b-[1px] border-black hover:border-b-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full text-lg text-gray-300 text-center mt-12 border-t border-black pt-6">
        <p>© 2024. All Rights Reserved.</p>
        <p>Made with ❤️ in India by Nageshwar Pawar.</p>
      </div>
    </footer>
  );
};

export default Footer;
