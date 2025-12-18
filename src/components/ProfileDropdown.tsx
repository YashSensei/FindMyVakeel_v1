import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';

interface ProfileDropdownProps {
  onNavigate?: () => void; // Optional callback when navigating (for mobile menu)
}

const ProfileDropdown = ({ onNavigate }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    onNavigate?.();
    navigate('/');
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  // Generate avatar URL using DiceBear with user's name/email as seed
  const avatarSeed = user?.name || user?.email || 'user';
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="px-3 py-2 flex items-center rounded-full text-foreground text-sm font-medium border border-border hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={user?.avatar || avatarUrl}
          alt={user?.name || 'User'}
          className="w-8 h-8 mr-2 rounded-full shrink-0 bg-primary/10 object-cover"
        />
        <span className="max-w-[100px] truncate hidden sm:inline">
          {user?.name?.split(' ')[0] || 'User'}
        </span>
        <ChevronDown className={`w-4 h-4 ml-2 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 shadow-2xl bg-white dark:bg-neutral-900 rounded-lg border border-border overflow-visible"
          style={{ zIndex: 99999 }}
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <p className="text-sm font-semibold text-foreground truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email || ''}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2 bg-white dark:bg-neutral-900">
            <Link
              to="/profile"
              onClick={handleLinkClick}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-secondary/80 text-foreground text-sm transition-colors"
            >
              <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">View Profile</span>
            </Link>
            
            <Link
              to="/dashboard"
              onClick={handleLinkClick}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-secondary/80 text-foreground text-sm transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">Dashboard</span>
            </Link>
            
            <div className="border-t border-border my-1" />
            
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-500 text-sm transition-colors text-left"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
