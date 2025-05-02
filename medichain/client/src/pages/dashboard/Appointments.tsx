
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// const mockAppointments = [
//   {
//     id: '1',
//     doctorName: 'Dr. Sarah Johnson',
//     doctorSpecialty: 'Cardiologist',
//     doctorImage: 'https://randomuser.me/api/portraits/women/64.jpg',
//     date: '2025-04-15',
//     time: '10:00 AM',
//     type: 'Video Consultation',
//     status: 'upcoming'
//   },
//   {
//     id: '2',
//     doctorName: 'Dr. Michael Williams',
//     doctorSpecialty: 'Neurologist',
//     doctorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
//     date: '2025-04-18',
//     time: '2:30 PM',
//     type: 'In-Person',
//     status: 'upcoming'
//   },
//   {
//     id: '3',
//     doctorName: 'Dr. Emily Chen',
//     doctorSpecialty: 'Dermatologist',
//     doctorImage: 'https://randomuser.me/api/portraits/women/33.jpg',
//     date: '2025-03-30',
//     time: '11:15 AM',
//     type: 'Video Consultation',
//     status: 'completed'
//   },
//   {
//     id: '4',
//     doctorName: 'Dr. Robert Garcia',
//     doctorSpecialty: 'General Physician',
//     doctorImage: 'https://randomuser.me/api/portraits/men/41.jpg',
//     date: '2025-04-02',
//     time: '9:00 AM',
//     type: 'In-Person',
//     status: 'completed'
//   },
//   {
//     id: '5',
//     doctorName: 'Dr. Lisa Anderson',
//     doctorSpecialty: 'Psychologist',
//     doctorImage: 'https://randomuser.me/api/portraits/women/26.jpg',
//     date: '2025-04-10',
//     time: '3:45 PM',
//     type: 'Video Consultation',
//     status: 'cancelled'
//   }
// ];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    let fn = async () => {
      console.log("fn")
      let response = await fetch('http://localhost:5000/getAppointmentsUser', {
        method : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body : JSON.stringify({"email" : localStorage.getItem("email")})
      })
      let res = await response.json();
      // console.log(res)
      setAppointments(res.upcoming);
      setPast(res.completed);
      setCancelled(res.cancelled)
    }
    fn()
  }, []);
  useEffect(() => {console.log(appointments); console.log(past); console.log(cancelled)}, [appointments, past, cancelled])

  const renderAppointment = (appointment:any) => (
    <Card key={appointment.id} className="mb-4">
      <CardContent className="p-5">
        <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
            <AvatarImage src={appointment[4][2]} alt={appointment.doctorName} />
            <AvatarFallback>{appointment[4][0].slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium" style = {{fontWeight : '700'}}>{appointment[4][0]}</h3>
            <h3 className="font-medium" style = {{fontWeight : '400', marginTop : '3px'}}>{appointment[4][1]}</h3>

            {/* <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p> */}
          </div>
          <Badge style = {{backgroundColor : appointment[2] === "online" ? 'rgb(33, 129, 44)' : 'rgb(33, 53, 121)'}} variant={appointment.status === 'upcoming' ? 'default' : 
                          appointment.status === 'completed' ? 'secondary' : 'destructive'}>
            {appointment[2]}
          </Badge>
          <button style = {{display : appointment}} onClick = {() => {window.location.href = `http://localhost:3000/${localStorage.getItem('name')}_____${appointment[4][0]}`}} style = {{display : appointment[2] === "online" ? 'flex' : 'none', border : '1px solid rgb(44, 51, 131)', padding : '5px 10px', borderRadius : '5px'}}>
            Join
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{appointment[0].slice(0,2)}/{appointment[0].slice(2, 4)}/{appointment[0].slice(4,8)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{appointment[1].slice(0, 2)}:{appointment[1].slice(2, 4)}</span>

            
          </div>
            
          <div>
            
          </div>
          <div className="flex items-center text-sm text-muted-foreground col-span-2">
            
            {/* <span>{appointment.type}</span> */}
          </div>
        </div>
        {appointment.status === 'upcoming' && (
          <div className="mt-4 flex space-x-2">
            {/* <Button variant="default" size="sm">Start Consultation</Button>
            <Button variant="outline" size="sm">Reschedule</Button> */}
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel</Button>
          </div>
        )}
        {appointment.status === 'completed' && (
          <div className="mt-4 flex space-x-2">
            <Button variant="outline" size="sm">View Summary</Button>
            <Button variant="outline" size="sm">Book Follow-up</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Appointments</h1>
        <p className="text-muted-foreground">Manage your upcoming and past appointments.</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({appointments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({past.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {appointments.length > 0 ? (
            appointments.map(renderAppointment)
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">You have no upcoming appointments.</p>
                <Button className="mt-4">Book an Appointment</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {past.length > 0 ? (
            past.map(renderAppointment)
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">You have no completed appointments.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-4 mt-4">
          {cancelled.length > 0 ? (
            cancelled.map(renderAppointment)
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">You have no cancelled appointments.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
