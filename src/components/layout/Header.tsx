'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Menu, X, LogIn, LogOut, UserCircle, User, ShoppingBag, Lock, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useWishlistStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthModal } from '@/components/auth/AuthModal';
import logo from "../../images/logo.png"

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

type ActiveCoupon = {
  code: string;
  description: string | null;
  type: 'PERCENTAGE' | 'FIXED';
  value: string | number;
  minOrderValue: string | number | null;
};

function couponToMarquee(c: ActiveCoupon): { text: string; code: string } {
  const val = parseFloat(String(c.value));
  const discount = c.type === 'PERCENTAGE' ? `${val}% OFF` : `₹${val.toLocaleString('en-IN')} OFF`;
  const min = c.minOrderValue ? ` on orders above ₹${parseFloat(String(c.minOrderValue)).toLocaleString('en-IN')}` : '';
  const text = c.description || `Flash Sale: Get Extra ${discount}${min}!`;
  return { text, code: c.code };
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [showAuthModal, setShowAuthModal]   = useState(false);
  const [showUserMenu, setShowUserMenu]     = useState(false);
  const [activeCoupons, setActiveCoupons]   = useState<ActiveCoupon[]>([]);
  const [mounted, setMounted]               = useState(false);

  const cartCount     = useCartStore(s => s.totalItems());
  const wishlistCount = useWishlistStore(s => s.items.length);
  const { user, isLoggedIn, logout } = useAuthStore();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/coupons/active').then(r => r.json()).then(j => {
      if (j.success) setActiveCoupons(Array.isArray(j.data) ? j.data : []);
    }).catch(() => {});
  }, []);

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email.split('@')[0]
    : null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
        }`}
      >


<div className="bg-[#1a2a6c] text-white py-2 overflow-hidden">
  <div className="flex whitespace-nowrap animate-marquee">
    {[...Array(3)].map((_, repeat) => (
      <span key={repeat} className="inline-flex items-center">
        {!mounted || activeCoupons.length === 0 ? (
          <span className="inline-flex items-center gap-3 md:gap-6 px-4 md:px-8 text-xs md:text-sm font-medium tracking-wide">
            <span>🚚 Free Delivery on Orders Above ₹999</span>
            <span className="text-yellow-300">★</span>
            <span>Premium Quality Mattresses for Better Sleep</span>
            <span className="text-yellow-300">★</span>
          </span>
        ) : activeCoupons.map((c) => {
          const { text, code } = couponToMarquee(c);
          return (
            <span key={c.code} className="inline-flex items-center gap-3 md:gap-6 px-4 md:px-8 text-xs md:text-sm font-medium tracking-wide">
              <span>🔥 {text}</span>
              <span className="bg-white text-[#1a2a6c] px-2 py-0.5 rounded font-bold text-xs">Code: {code}</span>
              <span className="text-yellow-300">★</span>
              <span>Free Delivery on Orders Above ₹999</span>
              <span className="text-yellow-300">★</span>
            </span>
          );
        })}
      </span>
    ))}
  </div>
</div>

        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
             <div>
              <Image src={logo} alt="logo" width={300} className="w-[160px] md:w-[220px] lg:w-[280px]" />
             </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 font-medium hover:text-navy-700 transition-colors duration-200 py-2 group text-xl"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full " />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-red-500 transition-colors">
                <Heart className="w-8 h-8" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-navy-700 transition-colors">
                <ShoppingCart className="w-8 h-8" />
                {mounted && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Admin Icon — always visible, goes to admin login */}
              <Link
                href="/admin/login"
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-[#092f75] hover:bg-[#092f75] transition shadow-sm"
                title="Admin Panel"
              >
                <Shield className="w-5 h-5 text-white" />
              </Link>

              {/* User / Auth */}
              {mounted && isLoggedIn() ? (
                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setShowUserMenu(v => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition text-sm font-medium text-gray-700"
                  >
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                      {displayName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="max-w-[80px] truncate">{displayName}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                      >
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <p className="text-xs font-bold text-gray-800 truncate">{displayName}</p>
                          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                        {/* Menu items */}
                        <Link href="/account" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                          <User className="w-4 h-4 text-indigo-400" /> My Profile
                        </Link>
                        <Link href="/account?tab=orders" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                          <ShoppingBag className="w-4 h-4 text-indigo-400" /> My Orders
                        </Link>
                        <Link href="/account?tab=password" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                          <Lock className="w-4 h-4 text-indigo-400" /> Change Password
                        </Link>
                        <div className="border-t border-gray-100" />
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
                  title="Sign In / Register"
                >
                  <UserCircle className="w-5 h-5 text-indigo-600" />
                </button>
              )}

              <Link href="/contact" className="hidden lg:block">
                <Button variant="primary" size="md">Get Quote</Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-navy-700 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={link.href} className="block py-3 px-4 text-gray-700 font-medium hover:text-navy-700 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 border-t mt-2 space-y-2">
                  {mounted && isLoggedIn() ? (
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center gap-2">
                        <UserCircle className="w-5 h-5 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-700">{displayName}</span>
                      </div>
                      <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-xs text-red-500 font-medium">
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-indigo-200 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition">
                      <LogIn className="w-4 h-4" /> Sign In / Register
                    </button>
                  )}
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">Get Quote</Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
