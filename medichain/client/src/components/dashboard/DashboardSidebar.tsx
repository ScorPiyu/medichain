
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, FileText, Settings, Users, 
  BarChart, LogOut, User, Stethoscope, ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type SidebarItemProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, title, isActive }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const patientLinks = [
    {
      href: '/dashboard/appointments',
      icon: <Calendar className="h-4 w-4" />,
      title: 'My Appointments',
    },
    // {
    //   href: '/dashboard/health-records',
    //   icon: <FileText className="h-4 w-4" />,
    //   title: 'Health Records',
    // },
    {
      href: '/dashboard/settings',
      icon: <Settings className="h-4 w-4" />,
      title: 'Settings',
    },
  ];
  
  const doctorLinks = [
    {
      href: '/dashboard/doctor',
      icon: <LayoutDashboard className="h-4 w-4" />,
      title: 'Dashboard',
    },
    // {
    //   href: '/dashboard/appointments',
    //   icon: <Calendar className="h-4 w-4" />,
    //   title: 'Appointments',
    // },
    // {
    //   href: '/dashboard/patients',
    //   icon: <Users className="h-4 w-4" />,
    //   title: 'My Patients',
    // },
    // {
    //   href: '/dashboard/settings',
    //   icon: <Settings className="h-4 w-4" />,
    //   title: 'Settings',
    // },
  ];
  
  const adminLinks = [
    {
      href: '/dashboard/admin',
      icon: <LayoutDashboard className="h-4 w-4" />,
      title: 'Dashboard',
    },
    {
      href: '/dashboard/users',
      icon: <Users className="h-4 w-4" />,
      title: 'Manage Users',
    },
    {
      href: '/dashboard/doctors',
      icon: <Stethoscope className="h-4 w-4" />,
      title: 'Doctors',
    },
    {
      href: '/dashboard/reports',
      icon: <BarChart className="h-4 w-4" />,
      title: 'Reports',
    },
    {
      href: '/dashboard/settings',
      icon: <Settings className="h-4 w-4" />,
      title: 'Settings',
    },
  ];
  
  const links = user?.role === 'doctor' 
    ? doctorLinks 
    : user?.role === 'admin' 
      ? adminLinks 
      : patientLinks;
  
  return (
    <div>
      {localStorage.getItem("loggedIn") === "user" ? (<div className="flex flex-col w-64 bg-card border-r border-border h-screen">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Link to="/" className="flex items-center">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">MediChain</span>
        </Link>
      </div>
      
      <div className="px-4 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.profileImage || ''} alt={user?.name || ''} />
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'doctor' && 'Doctor'}
              {user?.role === 'admin' && 'Administrator'}
              {user?.role === 'patient' && 'Patient'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              title={link.title}
              isActive={location.pathname === link.href}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>) : (<div className="flex flex-col w-64 bg-card border-r border-border h-screen">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Link to="/" className="flex items-center">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">MediChain</span>
        </Link>
      </div>
      
      <div className="px-4 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.profileImage || ''} alt={user?.name || ''} />
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'doctor' && 'Doctor'}
              {user?.role === 'admin' && 'Administrator'}
              {user?.role === 'patient' && 'Patient'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              title={link.title}
              isActive={location.pathname === link.href}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>)}
    </div>
    
  );
};

export default DashboardSidebar;
