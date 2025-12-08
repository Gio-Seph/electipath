import { Bell, User, LogOut, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/interest-survey') {
      return location.pathname.startsWith('/interest-survey');
    }
    if (path === '/exploration') {
      return location.pathname.startsWith('/exploration') || location.pathname.includes('/explore/');
    }
    return location.pathname === path;
  };

  // Get link styling based on active state
  const getLinkClass = (path) => {
    return isActive(path)
      ? "font-medium bg-blue-600/80 px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-600/20"
      : "font-medium hover:bg-slate-800 px-3 py-1 rounded-lg transition-colors text-slate-300";
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 text-white px-6 py-4 flex items-center justify-between shadow-xl">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold">ElectiPath</h1>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className={getLinkClass('/dashboard')}>
            Dashboard
          </Link>

          <Link to="/recommendation" className={getLinkClass('/recommendation')}>
            Elective Recommendation
          </Link>

          <Link to="/interest-survey" className={getLinkClass('/interest-survey')}>
            Interest Survey
          </Link>

          <Link to="/exploration" className={getLinkClass('/exploration')}>
            Elective Exploration
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <Search className="w-5 h-5 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer" />

        <span className="text-slate-300">Hello, {user?.first_name || user?.username || "User"}</span>

        <User className="w-5 h-5 cursor-pointer" />

        <LogOut className="w-5 h-5 cursor-pointer" onClick={handleLogout} title="Logout" />
      </div>
    </nav>
  );
}

export default Navbar;
