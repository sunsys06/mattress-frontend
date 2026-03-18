'use client';

import Link from 'next/link';
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnimatedSection } from '../ui/AnimatedSection';
import logo from "../../images/logo.png"

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
   { label: 'Warranty', href: '/warranty' },
      { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const categories = [
  { label: 'Coir', href: '/products?category=coir-mattress' },
  { label: 'Bonnell Spring', href: '/products?category=spring-mattress' },
  { label: 'Euro Top', href: '/products?category=euro-top-mattress' },
  { label: 'Foam', href: '/products?category=foam-mattress' },
  { label: 'Latex Foam', href: '/products?category=latex-foam-mattress' },
  { label: 'Memory Foam', href: '/products?category=memory-foam-mattress' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-[#f0f0f0] text-gray-300">
      {/* CTA Banner */}
  

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
            <div>
              <Image src={logo} alt="logo" width={300}  className="object-contain" />
            </div>
            </Link>
          
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-black hover:bg-accent-500 hover:border-accent-500 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent-400 font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black hover:text-accent-500 transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-accent-400 font-semibold text-lg mb-5">Explore Categories</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-black hover:text-accent-500 transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent-400 font-semibold text-lg mb-5">Need Help?</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+917760693333" className="text-black hover:text-accent-500 transition-colors">
                    +91 77606 93333
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
                <a href="mailto:info@mattressfactory.in" className="text-black hover:text-accent-500 transition-colors">
                 info@mattressfactory.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
                <div className="text-black">
                  <p>Monday - Saturday: 09:00 am - 8:00 pm</p>
                  <p>Sunday: 10:00 am - 4:00 pm</p>
                </div>
              </li>
               <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent-400 mt-1 flex-shrink-0" />
                <div className="text-black">
                 
                  <p>Sulakshmi Enterprise, 

No. 29/2 (Old No. 1), Studio Road,

J.B. Kaval, Near Rajkumar Samadhi,

Munneshwara Block, Yeshwanthpur,

Bangalore – 560058,

Karnataka, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-black">
            <p>&copy; {new Date().getFullYear()} MATTRESS FACTORY. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="hover:text-accent-500 transition-colors">Privacy Policy</Link>
              <Link href="/return" className="hover:text-accent-500 transition-colors">Return Policy</Link>
              <Link href="/shipping" className="hover:text-accent-500 transition-colors">Shipping Policy</Link>
              <Link href="/terms" className="hover:text-accent-500 transition-colors">Terms &amp; Conditions</Link>
            </div>
            <p>
              Developed by{' '}
              <a href="https://sunsystechnologies.com" target="_blank" rel="noopener noreferrer" className="transition-colors">
                Sunsys Technologies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
