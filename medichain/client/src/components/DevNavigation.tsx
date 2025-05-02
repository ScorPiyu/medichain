import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DevNavigation: React.FC = () => {
  const location = useLocation();
  console.log("Current location:", location.pathname);
  
  const routes = [
    { path: '/', name: 'Landing Page' },
    { path: '/doctors', name: 'Doctors List' },
    { path: '/doctors/1', name: 'Doctor Profile (Example)' },
    { path: '/emergency', name: 'Emergency Consult' },
    { path: '/about', name: 'About Us' },
    { path: '/login', name: 'Login' },
    { path: '/register', name: 'Register' },
    { path: '/dashboard/patient', name: 'Patient Dashboard' },
    { path: '/dashboard/doctor', name: 'Doctor Dashboard' },
    { path: '/dashboard/admin', name: 'Admin Dashboard' },
    { path: '/dashboard/appointments', name: 'Appointments' },
    { path: '/dashboard/health-records', name: 'Health Records' },
    { path: '/dashboard/settings', name: 'Profile Settings' },
    { path: '/not-found-example', name: '404 Page (Example)' },
  ];

  return (
    <Card className="max-w-3xl mx-auto my-8 border-4 border-primary/50">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-center text-2xl">Development Navigation</CardTitle>
        <CardDescription className="text-center">
          Use these links to navigate to different pages in the application.
          This component is for development purposes only.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {routes.map((route) => (
            <Button
              key={route.path}
              variant="outline"
              className={`justify-start h-auto py-2 px-3 text-left ${
                location.pathname === route.path ? 'bg-primary/10 border-primary' : ''
              }`}
              asChild
            >
              <Link to={route.path}>
                {route.name}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DevNavigation;