import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Settings, LogOut, Menu, X, Home, Activity, Calendar, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TradeTable } from '@/components/trades/TradeTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { icon: Home, label: 'Overview', component: TradeTable },
  { icon: Activity, label: 'Analytics' },
  { icon: Calendar, label: 'Calendar' },
  { icon: PieChart, label: 'Reports' },
];

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const { user, signOut } = useAuthStore();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const ActiveComponent = menuItems.find(item => item.label === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-20"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold gradient-text">Dashboard</h2>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className={`w-full justify-start hover:bg-gray-100 ${
                      activeTab === item.label ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => setActiveTab(item.label)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            {!isSidebarOpen && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="ml-auto flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  >
                    <span className="text-white font-bold">
                      {user?.email?.[0].toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="text-center text-gray-500">
              Coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}