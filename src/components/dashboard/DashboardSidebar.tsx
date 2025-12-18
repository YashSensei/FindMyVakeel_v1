import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Scale,
  MessageSquare,
  FileText,
  CreditCard,
  LogOut,
  Star,
  User,
  X,
} from 'lucide-react';
import { Lawyer, StoredCaseData } from '@/types';
import { User as UserType } from '@/types';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'chat', icon: MessageSquare, label: 'Chat' },
  { id: 'documents', icon: FileText, label: 'Documents' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
];

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lawyer: Lawyer | null;
  caseData: StoredCaseData | null;
  user: UserType | null;
  logout: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const SidebarContent = memo(({
  activeTab,
  setActiveTab,
  lawyer,
  caseData,
  user,
  logout,
  isMobile = false,
  onClose,
}: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="p-4 border-b flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Find My Vakeel</span>
        </Link>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Case Summary */}
      <div className="p-4 border-b">
        <div className="bg-primary/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`bg-primary/20 text-primary ${isMobile ? 'text-xs' : ''}`}>
              {caseData?.aiAnalysis?.category?.replace('-', ' ') || 'Legal Case'}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {caseData?.aiAnalysis?.processedProblem?.substring(0, isMobile ? 80 : 100) || 'Your active case'}...
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-${isMobile ? '3' : '2'} rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Lawyer Card */}
      {lawyer && (
        <div className="p-4 border-t">
          <p className="text-xs text-gray-500 mb-2">Your Lawyer</p>
          <div className="flex items-center gap-3">
            <img
              src={lawyer.avatar}
              alt={lawyer.name}
              className="w-10 h-10 rounded-full bg-gray-100"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{lawyer.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                {lawyer.rating}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* User Section */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'demo@example.com'}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );
});

SidebarContent.displayName = 'SidebarContent';

// Mobile Sidebar with overlay
export const MobileSidebar = memo(({
  isOpen,
  onClose,
  ...props
}: DashboardSidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col lg:hidden overflow-y-auto"
          >
            <SidebarContent {...props} isMobile isOpen={isOpen} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

MobileSidebar.displayName = 'MobileSidebar';

// Desktop Sidebar
export const DesktopSidebar = memo((props: Omit<DashboardSidebarProps, 'isMobile' | 'isOpen' | 'onClose'>) => {
  return (
    <aside className="hidden lg:flex w-64 bg-white border-r flex-col flex-shrink-0 h-screen overflow-hidden">
      <SidebarContent {...props} />
    </aside>
  );
});

DesktopSidebar.displayName = 'DesktopSidebar';

export default SidebarContent;
