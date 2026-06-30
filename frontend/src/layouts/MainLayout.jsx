import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { BrainCircuit, LogOut, User as UserIcon } from 'lucide-react';

const MainLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <Link to="/" className="text-xl font-bold text-gray-900">
                AI Prompt Hub
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {!isAuthenticated ? (
                <>
                  <a href="/#features" className="text-gray-500 hover:text-gray-900">Features</a>
                  <a href="/#how-it-works" className="text-gray-500 hover:text-gray-900">How it Works</a>
                  <Link to="/login" className="text-gray-500 hover:text-gray-900 font-medium">Login</Link>
                  <Link to="/register" className="bg-dark text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="text-primary font-bold hover:text-blue-700">Admin Panel</Link>
                  )}
                  <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">Dashboard</Link>
                  <Link to="/modules" className="text-gray-500 hover:text-gray-900">Modules</Link>
                  <Link to="/playground" className="text-gray-500 hover:text-gray-900">Playground</Link>
                  <Link to="/challenges" className="text-gray-500 hover:text-gray-900">Challenges</Link>
                  <Link to="/marketplace" className="text-gray-500 hover:text-gray-900">Marketplace</Link>
                  
                  <div className="flex items-center gap-4 ml-4 pl-4 border-l">
                    <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-primary">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-sm font-medium">{user?.name || 'User'}</span>
                    </Link>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-danger">
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AI Prompt Engineering Learning Hub. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
