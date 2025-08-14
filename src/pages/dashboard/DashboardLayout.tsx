import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FileText, BookOpen, Send, Users, ClipboardList, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-4">
          <SidebarLink to="/admin" icon={<LayoutDashboard size={18} />}>Dashboard</SidebarLink>
          <SidebarLink to="/admin/projects" icon={<FileText size={18} />}>Projects</SidebarLink>
          <SidebarLink to="/admin/articles" icon={<BookOpen size={18} />}>Articles</SidebarLink>
          <SidebarLink to="/admin/submitted-projects" icon={<Send size={18} />}>Submitted Projects</SidebarLink>
          <SidebarLink to="/admin/submitted-dissertations" icon={<ClipboardList size={18} />}>Dissertations</SidebarLink>
          <SidebarLink to="/admin/submitted-stories" icon={<Users size={18} />}>Stories</SidebarLink>
          <SidebarLink to="/admin/internship-forms" icon={<Users size={18} />}>Applications</SidebarLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarLink({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const location = useLocation();

  const isDashboard = to === "/admin";

  const isActive = isDashboard
    ? location.pathname === "/admin" || location.pathname === "/admin/"
    : location.pathname.startsWith(to);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 ${
        isActive ? "bg-gray-200 font-medium" : ""
      }`}
    >
      <NavLink to={to} className="flex items-center gap-2 w-full h-full">
        {icon}
        {children}
      </NavLink>
    </div>
  );
}


