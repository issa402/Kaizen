import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Sparkles, LogOut, CreditCard, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-semibold text-gray-900">
              Kaizen Journal
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Journal
              </Link>
              
              <Link
                to="/inspiration"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/inspiration')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Inspiration
              </Link>

              <Link
                to="/long-term-goals"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/long-term-goals')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Target className="w-4 h-4 mr-2" />
                Long-Term Goals
              </Link>

              <Link
                to="/pricing"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/pricing')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Upgrade
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}