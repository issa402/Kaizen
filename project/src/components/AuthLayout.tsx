import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/dashboard" className="flex items-center px-2 py-2 text-gray-900">
                <span className="text-xl font-semibold">Kaizen Journal</span>
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}