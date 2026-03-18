'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Tag,
  Globe,
  LogOut,
  Menu,
  X,
  Search,
  Shield,
  ExternalLink,
} from 'lucide-react';
import logo from '@/images/logo.png';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard',  href: '/admin/dashboard' },
  { icon: Package,         label: 'Products',   href: '/admin/products' },
  { icon: FolderTree,      label: 'Categories', href: '/admin/categories' },
  { icon: ShoppingCart,    label: 'Orders',     href: '/admin/orders' },
  { icon: Users,           label: 'Users',      href: '/admin/users' },
  { icon: Tag,             label: 'Coupons',    href: '/admin/coupons' },
  { icon: Globe,           label: 'SEO',        href: '/admin/seo' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore(s => s.logout);
  const user = useAuthStore(s => s.user);
  const token = useAuthStore(s => s.token);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && (!token || !user || user.role !== 'ADMIN')) {
      router.replace('/admin/login');
    }
  }, [mounted, token, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (!mounted || !token || !user || user.role !== 'ADMIN') {
    return null;
  }

  const adminName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email.split('@')[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-[#1a2a6c] text-white flex flex-col shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link href="/admin/dashboard" className="block">
            <Image src={logo} alt="Mattress Factory" width={140} className="brightness-0 invert w-[110px] lg:w-[140px]" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#092f75] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white truncate max-w-[140px]">{adminName}</p>
              <span className="text-[10px] font-medium bg-[#092f75]/20 text-amber-300 px-1.5 py-0.5 rounded-full">Super Admin</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#092f75]" />}
              </Link>
            );
          })}
        </nav>

        {/* View Store + Logout */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>View Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col flex-1">

        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Mobile toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Page title */}
            <div className="hidden lg:block">
              <h1 className="text-sm font-semibold text-gray-800 capitalize">
                {pathname.split('/').filter(Boolean).slice(1).join(' › ') || 'Dashboard'}
              </h1>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-sm mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30"
                />
              </div>
            </div>

            {/* Admin info */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#092f75] flex items-center justify-center shadow-sm">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{adminName}</p>
                <p className="text-xs text-amber-600 font-medium">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Image src={logo} alt="Mattress Factory" width={100} className="w-[70px] md:w-[100px]" />
              <span className="text-xs text-gray-400">Admin Panel</span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} Mattress Factory. All rights reserved. &nbsp;|&nbsp;
              <Link href="/" className="hover:text-[#1a2a6c] transition-colors">Visit Store</Link>
            </p>
            <p className="text-xs text-gray-400">
              Built by <span className="font-medium text-[#1a2a6c]">Sunsys Technologies</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
