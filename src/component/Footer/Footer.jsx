
import React from 'react'
import { Box, Typography, Grid, Link, IconButton, Divider } from "@mui/material";
import { GitHub, Web, LibraryBooks, Instagram, LinkedIn, Facebook, Twitter, Mail } from "@mui/icons-material";
// import Link from "next/link"
// import { Github, Linkedin, Mail, Twitter } from "lucide-react"

// export 
const Footer =() =>{
  return (
    <>
    <footer className="bg-black text-white py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Project Summary */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-gray-200 pb-2">About QuickBite</h3>
            <p className="text-slate-300">
                {/* <span> */}
              {/* QuickBite is an online food delivery platform connecting hungry customers with local restaurants. Our */}
              {/* mission is to make food ordering simple, fast, and enjoyable. */}
              {/* </span> */}
              
              QuickBite is your ultimate food-ordering platform, connecting you with the best local restaurants and eateries. Explore a variety of delicious meals, place your order with ease, and enjoy your favorite food hassle-free. Whether you're craving comfort food or something new, QuickBite is here to serve your hunger with just a few taps! 
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b pb-2 border-gray-200">Tech Stack</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Frontend: React.js, Tailwind CSS, Redux, Material-UI</li>
              <li>• Backend: Spring Boot, REST APIs </li>
              <li>• Database: Mysql, Cloudinary</li>
              <li>• Authentication: JWT</li>
              <li>• Payment: Stripe API</li>
              <li>• Deployment: Vercel</li>
              <li>• Others: Axios, Formik, Yup</li>
            </ul>
          </div>

          {/* Project Flow */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-gray-200 pb-2">Project Flow</h3>
            <div className="bg-black p-4 rounded-lg text-sm">
              <p className="mb-2 text-slate-300">User → Browse Restaurants</p>
              <p className="mb-2 text-slate-300">↓</p>
              <p className="mb-2 text-slate-300">Select Items → Add to Cart</p>
              <p className="mb-2 text-slate-300">↓</p>
              <p className="mb-2 text-slate-300">Checkout → Payment</p>
              <p className="mb-2 text-slate-300">↓</p>
              <p className="mb-2 text-slate-300">Order Confirmation → Tracking</p>
              <p className="text-slate-300">↓</p>
              <p className="text-slate-300">Delivery → Feedback</p>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-gray-200 pb-2">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/rahulkrchaudhary" className="hover:text-primary transition-colors">
                <GitHub className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/rahulkrchaudhary/" className="hover:text-primary transition-colors">
                <LinkedIn className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://x.com/rahulkr8595" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="mailto:rahulkrchaudhary12@gmail.com" className="hover:text-primary transition-colors">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <div className="pt-2">
              <h4 className="font-medium mb-2">Key Features:</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>•  User Authentication </li>
                <li>• Browse Restaurants & Menus</li>
                <li>• Add to Cart & Checkout</li>
                <li>•  Payment Integration (Stripe API) </li>
                <li>•  Real-time Order Tracking </li>
                <li>• Admin Dashboard</li>
                <li>• User-friendly UI/UX</li>
                <li>• Restaurant & Dish Reviews</li>
                <li>• Notifications & Alerts</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-slate-400 text-sm">
            <p>Online Food Delivery | Designed & Developed with ❤️ by Rahul Kumar</p>
          <p>© {new Date().getFullYear()} QuicBite. All rights reserved.</p>
          {/* <div className="flex justify-center space-x-4 mt-2">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer;

