import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Layout, LogOut, User, Search, PlusCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">FolioBuilder</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-sm font-medium text-slate-600 hover:text-primary flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              Explore
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-primary flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link to="/dashboard/editor" className="btn-primary py-2 px-4 text-xs">
                  <PlusCircle className="w-4 h-4 mr-1.5" />
                  Edit Portfolio
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-5 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary py-2 px-5 text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-slate-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile navigation dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                to="/search"
                className="flex items-center gap-2 text-slate-600 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-4 h-4" /> Explore
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-slate-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    to="/dashboard/editor"
                    className="flex items-center gap-2 text-slate-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PlusCircle className="w-4 h-4" /> Edit Portfolio
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-slate-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 text-slate-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-5 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
