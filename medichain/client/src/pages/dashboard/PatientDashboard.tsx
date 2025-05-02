
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, Clock, FileText, AlertCircle, Heart, Activity, 
  TrendingUp, BarChart3, Users, Plus, Bell, StethoscopeIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {navigate("/dashboard/appointments")}, [])
  
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 'appt1',
      doctorName: 'Dr. Rahul Verma',
      specialty: 'Cardiologist',
      date: '2023-04-10',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'confirmed',
      image: '/placeholder.svg',
    },
    {
      id: 'appt2',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      date: '2023-04-15',
      time: '3:30 PM',
      type: 'In-Person',
      status: 'pending',
      image: '/placeholder.svg',
    },
  ];
  
  // Mock data for health metrics
  const healthData = [
    { name: 'Jan', heartRate: 72, bloodPressure: 120, weight: 68 },
    { name: 'Feb', heartRate: 74, bloodPressure: 118, weight: 67 },
    { name: 'Mar', heartRate: 71, bloodPressure: 122, weight: 67.5 },
    { name: 'Apr', heartRate: 73, bloodPressure: 121, weight: 68 },
    { name: 'May', heartRate: 75, bloodPressure: 119, weight: 68.5 },
    { name: 'Jun', heartRate: 73, bloodPressure: 120, weight: 69 },
  ];
  
  // Mock data for medicine schedule
  const medicineSchedule = [
    {
      name: 'Aspirin',
      dosage: '75mg',
      schedule: 'Once daily',
      time: 'Morning',
      remainingDays: 15,
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      schedule: 'Twice daily',
      time: 'Morning and Evening',
      remainingDays: 7,
    },
  ];
  
  // Mock data for health alerts
  const healthAlerts = [
    {
      id: 'alert1',
      message: 'Your blood pressure reading is slightly higher than normal',
      severity: 'medium',
      date: '2023-04-05',
    },
    {
      id: 'alert2',
      message: 'You have missed your medicine schedule for 2 days',
      severity: 'high',
      date: '2023-04-07',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Your health overview is displayed below.
          </p>
        </div>
        <Button onClick={() => navigate('/doctors')}>
          <Plus className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Upcoming Appointments</p>
                <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Health Records</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Medications</p>
                <p className="text-2xl font-bold">{medicineSchedule.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Health Alerts</p>
                <p className="text-2xl font-bold">{healthAlerts.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Bell className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming appointments.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/doctors')}
                >
                  Book an Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center mb-4 md:mb-0">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={appointment.image} />
                        <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <Badge variant={appointment.type === 'Video Consultation' ? 'outline' : 'secondary'}>
                        {appointment.type}
                      </Badge>
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                        {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Medicine Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {medicineSchedule.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active medications.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {medicineSchedule.map((medicine, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{medicine.name}</p>
                      <Badge>
                        {medicine.remainingDays} days left
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {medicine.dosage} - {medicine.schedule}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Time: {medicine.time}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      
    </div>
  );
};

export default PatientDashboard;
