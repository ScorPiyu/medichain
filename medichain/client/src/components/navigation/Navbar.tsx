
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Calendar, PhoneCall, 
  User, LogIn, Stethoscope, Shield, Languages 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { user, isAuthenticated, logout } = useAuth();
  // const isAuthenticated = false;
  let [user, setUser] = useState(null)
  let [doctor, setDoctor] = useState(null)
  const [loggedIn, setLoggedIn] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let LI = localStorage.getItem("loggedIn");
    if(LI == "patient") {
      setLoggedIn("patient");
      setUser({"profileImage" : "", "name" : localStorage.getItem('name'), "role" : "none", "email" : "goggle@gmail.com"});

    }
    else if(LI == "doctor") {
      setLoggedIn("doctor");
      setDoctor({"profileImage" : "", "name" : "Doctor", "role" : "doctor", "email" : "apple@gmail.com"});

    }
  }, [])
   const { logout } = useAuth();
  return (
    <nav className="bg-white shadow-sm border-b z-10 sticky top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">MediChain</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/doctors" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Find Doctors
              </Link>
              <Link to="/emergency" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Emergency
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                About Us
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Appointment Booking</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <PhoneCall className="mr-2 h-4 w-4" />
                    <span>Teleconsultation</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Health Insurance</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Languages className="h-4 w-4 mr-1" />
                  <span>EN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user?.profileImage || ''} alt={user?.name || ''} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/patient`)}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/appointments')}>
                    My Appointments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {console.log("aah"); localStorage.setItem("name", ""); localStorage.setItem("loggedIn", ""); localStorage.setItem("email", ""); window.location.reload();
}}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : doctor? <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={doctor?.profileImage || ''} alt={doctor?.name || ''} />
                  <AvatarFallback>{doctor?.name?.charAt(0) || 'F'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigate(`/dashboard/doctor`)}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/appointments')}>
                Schedule
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {console.log("aah"); localStorage.setItem("name", ""); localStorage.setItem("loggedIn", ""); localStorage.setItem("email", ""); window.location.reload();
}}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            
            : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
                <Button onClick={() => navigate('/register')}>
                  <User className="mr-2 h-4 w-4" /> Register
                </Button>
              </>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-2">
            <Link 
              to="/doctors" 
              className="text-gray-600 hover:bg-primary/10 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Find Doctors
            </Link>
            <Link 
              to="/emergency" 
              className="text-gray-600 hover:bg-primary/10 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Emergency
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:bg-primary/10 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <div className="text-gray-600 hover:bg-primary/10 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
              Services
              <div className="pl-4 mt-2 space-y-1">
                <Link 
                  to="#" 
                  className="text-gray-500 hover:text-primary block px-3 py-1 text-sm"
                  onClick={() => {navigate("/doctors")}}
                >
                  Appointment Booking
                </Link>
                <Link 
                  to="#" 
                  className="text-gray-500 hover:text-primary block px-3 py-1 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Teleconsultation
                </Link>
                <Link 
                  to="#" 
                  className="text-gray-500 hover:text-primary block px-3 py-1 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Health Insurance
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user?.profileImage || ''} alt={user?.name || ''} />
                    <AvatarFallback>{'f'}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
            ) : doctor ? 
            (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={doctor?.profileImage || ''} alt={doctor?.name || ''} />
                    <AvatarFallback>{'f'}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
            )
            :
             (
              <div className="flex flex-col space-y-2 px-4">
                <Button variant="outline" onClick={() => { navigate('/login'); setIsOpen(false); }}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
                <Button onClick={() => { navigate('/register'); setIsOpen(false); }}>
                  <User className="mr-2 h-4 w-4" /> Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
