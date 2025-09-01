import { useState } from 'react';
import { 
  Menu, X, Package, Grid3X3, Users, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { SiPuma } from 'react-icons/si';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Brands', active: false, to:'brand' },
    { icon: Package, label: 'Products', active: true , to:'products'},
    { icon: Grid3X3, label: 'Categories', active: false, to:'category' },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed top-0 left-0 bg-black text-white shadow-lg z-50 transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${isCollapsed ? 'w-16' : 'w-64'}
        lg:translate-x-0 lg:relative lg:h-screen
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <SiPuma  size={20} />
              </div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
          )}
          
          <button
            onClick={toggleCollapse}
            className="hidden lg:block p-1 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.to} className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ${isCollapsed ? 'justify-center' : ''}
                `}>
                  <item.icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-700 p-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <Users size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Iman</p>
                <p className="text-xs text-gray-400 truncate">h.iman200622@gmail.com</p>
              </div>
            </div>
          )}
          
          <button onClick={handleClick} className={`
            w-full flex items-center space-x-3 px-3 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <LogOut size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

    </>
  );
};

export default SideBar;