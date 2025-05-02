
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, Calendar, Clock, CheckCheck, ArrowUpRight, 
  TrendingUp, BarChart3, DollarSign, Phone, Video,
  UserCheck, Star, ThumbsUp, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for today's appointments
  const todayAppointments = [
    {
      id: 'appt1',
      patientName: 'Rahul Mehta',
      age: 42,
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'upcoming',
      reason: 'Follow-up',
      image: '/placeholder.svg',
    },
    {
      id: 'appt2',
      patientName: 'Anjali Gupta',
      age: 35,
      time: '11:30 AM',
      type: 'In-Person',
      status: 'completed',
      reason: 'Chest pain',
      image: '/placeholder.svg',
    },
    {
      id: 'appt3',
      patientName: 'Vikram Singh',
      age: 58,
      time: '2:00 PM',
      type: 'Video Consultation',
      status: 'upcoming',
      reason: 'Blood pressure check',
      image: '/placeholder.svg',
    },
    {
      id: 'appt4',
      patientName: 'Sunita Sharma',
      age: 29,
      time: '3:30 PM',
      type: 'In-Person',
      status: 'cancelled',
      reason: 'Fever and cold',
      image: '/placeholder.svg',
    },
  ];
  
  // Mock data for statistics
  const patientStats = [
    { name: 'Jan', patients: 40 },
    { name: 'Feb', patients: 45 },
    { name: 'Mar', patients: 55 },
    { name: 'Apr', patients: 60 },
    { name: 'May', patients: 65 },
    { name: 'Jun', patients: 75 },
  ];
  
  const appointmentDistribution = [
    { name: 'Video', value: 45 },
    { name: 'In-Person', value: 35 },
    { name: 'Emergency', value: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  const consultationData = [
    { name: 'Mon', inPerson: 4, video: 6 },
    { name: 'Tue', inPerson: 5, video: 3 },
    { name: 'Wed', inPerson: 6, video: 4 },
    { name: 'Thu', inPerson: 3, video: 7 },
    { name: 'Fri', inPerson: 7, video: 5 },
    { name: 'Sat', inPerson: 6, video: 3 },
    { name: 'Sun', inPerson: 0, video: 0 },
  ];
  
  // Mock data for recent patients
  const recentPatients = [
    {
      id: 'pat1',
      name: 'Amit Kumar',
      age: 45,
      lastVisit: '2023-04-05',
      condition: 'Hypertension',
      image: '/placeholder.svg',
    },
    {
      id: 'pat2',
      name: 'Priya Patel',
      age: 32,
      lastVisit: '2023-04-02',
      condition: 'Diabetes',
      image: '/placeholder.svg',
    },
    {
      id: 'pat3',
      name: 'Rajesh Singh',
      age: 55,
      lastVisit: '2023-03-28',
      condition: 'Arthritis',
      image: '/placeholder.svg',
    },
  ];
  
  const upcomingAppointments = todayAppointments.filter(appt => appt.status === 'upcoming');
  const completedAppointments = todayAppointments.filter(appt => appt.status === 'completed');
  const cancelledAppointments = todayAppointments.filter(appt => appt.status === 'cancelled');


  let [upcoming, setUpcoming] = useState([]);
  let [completed, setCompleted] = useState([]);
  let [cancelled, setCancelled] = useState([]);
  let [er, setEr] = useState(false);
  let [ms, setMs] = useState(false)

  useEffect(() => {
    let fn = async() => {
      let response = await fetch('http://localhost:5000/er',  {
        method : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body : JSON.stringify({"name" : localStorage.getItem("name")})
      })
      let res = await response.json();
      if(res.found == true) {
        setEr(true)
      }
      return;
    }
    fn();
  }, [])
  useEffect(() => {
    let fn = async () => {
      console.log("fn")
      let response = await fetch('http://localhost:5000/getAppointments', {
        method : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body : JSON.stringify({"email" : localStorage.getItem("email")})
      })
      let res = await response.json();
      // console.log(res)
      setUpcoming(res.upcoming);
      setCompleted(res.completed);
      setCancelled(res.cancelled)
    }
    fn()
  }, [])
  useEffect(() => {
    console.log(upcoming);
    console.log(completed);
    console.log(cancelled);

  }, [upcoming, completed, cancelled])

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddSlot = () => {
    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }

    const newSlot = { date, time };
    console.log("New Slot Added:", newSlot);

    // Reset inputs
    setDate("");
    setTime("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Here's your practice overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick = {() => {setMs(!ms)}}>
            <Calendar className="mr-2 h-4 w-4" />
            Manage Schedule
          </Button>
          <div style = {{position : 'absolute', marginTop : '15px', display : ms ? 'flex' : 'none'}}>
               <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">

      <div className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddSlot}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Slot
        </button>
      </div>
    </div>
          </div>
          <Button onClick = {async () => {setEr(!er); 
            await fetch('http://localhost:5000/toggleEr', {
              method : 'POST',
              headers : {'Content-type' : 'application/json'},
              body : JSON.stringify({"name" : localStorage.getItem("name")})
            })
          }}>
            {er ? ("Emergency calls enabled") : ("Enable emergency calls")}
          </Button>
        </div>
      </div>
      
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Patients</p>
                <p className="text-2xl font-bold">248</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5% increase
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Today's Appointments</p>
                <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                <p className="text-xs flex items-center mt-1">
                  Next at {upcomingAppointments[0]?.time || 'N/A'}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Completed Today</p>
                <p className="text-2xl font-bold">{completedAppointments.length}</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <CheckCheck className="h-3 w-3 mr-1" />
                  All done
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Earnings This Month</p>
                <p className="text-2xl font-bold">₹52,400</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12% increase
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcoming.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming appointments for today.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcoming.map((appointment : any) => (
                      <div 
                        key={appointment.id} 
                        className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center mb-4 md:mb-0">
                          
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{appointment[2]}</p>
                          
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center mr-4">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{appointment[1].toString().slice(0,2)}:{appointment[1].toString().slice(2,4)}, {appointment[0].toString().slice(0,2)}/{appointment[0].toString().slice(2,4)}/{appointment[0].toString().slice(4,8)}</span>
                          </div>
                          <Badge variant={appointment[3] === 'offline' ? 'outline' : 'secondary'}>
                            {appointment[3]}
                          </Badge>
                          <div className="flex gap-2">
                            {/* <Button size="sm" variant="outline">
                              View Details
                            </Button> */}
                            {/* <Button size="sm" style = {{backgroundColor : 'rgb(230, 0, 0)', color : 'white'}} variant="outline">
                              Cancel
                            </Button> */}
                            <Button size="sm" onClick = {() => {
                              if(appointment[3] === "online") {
                                window.location.href = `http://localhost:3000/${localStorage.getItem('name')}_____${localStorage.getItem('name')}`
                              }
                            }}>
                              {appointment[3] === 'online' ? (
                                <>
                                  <Video className="h-4 w-4 mr-2" />
                                  Start
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Check
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
              {completed.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming appointments for today.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completed.map((appointment : any) => (
                      <div 
                        key={appointment.id} 
                        className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center mb-4 md:mb-0">
                          
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{appointment[2]}</p>
                          
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center mr-4">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{appointment[1].toString().slice(0,2)}:{appointment[1].toString().slice(2,4)}, {appointment[0].toString().slice(0,2)}/{appointment[0].toString().slice(2,4)}/{appointment[0].toString().slice(4,8)}</span>
                          </div>
                          <Badge variant={appointment[3] === 'offline' ? 'outline' : 'secondary'}>
                            {appointment[3]}
                          </Badge>
                          <div className="flex gap-2">
                            {/* <Button size="sm" variant="outline">
                              View Details
                            </Button>
                             */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="cancelled">
              {cancelled.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming appointments for today.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cancelled.map((appointment : any) => (
                      <div 
                        key={appointment.id} 
                        className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center mb-4 md:mb-0">
                          
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{appointment[2]}</p>
                          
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center mr-4">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{appointment[1].toString().slice(0,2)}:{appointment[1].toString().slice(2,4)}, {appointment[0].toString().slice(0,2)}/{appointment[0].toString().slice(2,4)}/{appointment[0].toString().slice(4,8)}</span>
                          </div>
                          <Badge variant={appointment[3] === 'offline' ? 'outline' : 'secondary'}>
                            {appointment[3]}
                          </Badge>
                          <div className="flex gap-2">
                            {/* <Button size="sm" variant="outline">
                              View Details
                            </Button> */}
                           
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        
      </div>
              
      
      
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Patient Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={patientStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Consultation Types</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={consultationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inPerson" name="In-Person" fill="#8884d8" />
                  <Bar dataKey="video" name="Video" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default DoctorDashboard;
