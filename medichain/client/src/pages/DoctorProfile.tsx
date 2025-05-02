
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, Mail, Globe, Star, MessageSquare, Video, ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {loadStripe} from '@stripe/stripe-js';

// Mock doctor data - in a real app, this would come from an API
// const mockDoctors = [
//   {
//     id: '1',
//     name: 'Dr. Sarah Johnson',
//     specialty: 'Cardiologist',
//     qualifications: 'MD, FACC',
//     experience: '15 years',
//     hospital: 'City Medical Center',
//     location: 'New York, NY',
//     about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience. She specializes in preventive cardiology, heart failure management, and cardiovascular disease in women.',
//     profileImage: 'https://randomuser.me/api/portraits/women/64.jpg',
//     rating: 4.9,
//     reviewCount: 127,
//     languages: ['English', 'Spanish'],
//     consultationFee: 150,
//     availableDays: ['Monday', 'Wednesday', 'Friday'],
//     timeSlots: ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
//     education: [
//       { degree: 'MD', institution: 'Harvard Medical School', year: '2005' },
//       { degree: 'Residency', institution: 'Massachusetts General Hospital', year: '2008' },
//       { degree: 'Fellowship', institution: 'Johns Hopkins Hospital', year: '2011' }
//     ],
//     services: ['Cardiac Consultation', 'ECG', 'Stress Testing', 'Echocardiography'],
//     telehealth: true,
//     inPerson: true
//   },
//   {
//     id: '2',
//     name: 'Dr. Michael Williams',
//     specialty: 'Neurologist',
//     qualifications: 'MD, PhD',
//     experience: '12 years',
//     hospital: 'Metropolitan Neurology Institute',
//     location: 'Boston, MA',
//     about: 'Dr. Michael Williams is a renowned neurologist specializing in headache disorders, multiple sclerosis, and stroke management. His research has been published in leading medical journals.',
//     profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
//     rating: 4.7,
//     reviewCount: 98,
//     languages: ['English', 'French'],
//     consultationFee: 175,
//     availableDays: ['Tuesday', 'Thursday', 'Saturday'],
//     timeSlots: ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
//     education: [
//       { degree: 'MD', institution: 'Yale School of Medicine', year: '2008' },
//       { degree: 'PhD', institution: 'Yale University', year: '2010' },
//       { degree: 'Residency', institution: 'Mayo Clinic', year: '2014' }
//     ],
//     services: ['Neurological Examination', 'EEG', 'EMG', 'Botox for Migraines'],
//     telehealth: true,
//     inPerson: true
//   }
// ];

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  let [date, setDate] = useState("");
  useEffect(() => {
    // Simulate API fetch with a timeout
    const getDoctors = async () => {
      try {
        console.log("hell");
        const response = await fetch('http://localhost:5000/getDoctors', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json(); 
          console.log("fetched doctors:", data);
          const matchedDoctor = data.find((d) => d.id === id);
          setDoctor(matchedDoctor || []);
          setTimeout(() => {setLoading(false)}, 600)
        } else {
          console.log("Fetch failed with status", response.status);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    
  
    getDoctors();
  }, []);
  useEffect(() => {
    console.log("doctor:", doctor);
    console.log(doctor.timeSlots)

  }, [doctor]);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-t-4 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
        <p className="mb-6">The doctor you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/doctors">View All Doctors</Link>
        </Button>
      </div>
    );
  }

  async function handleBookAppointment(mode : any)  {

    const stripe = await loadStripe("pk_test_51RDQUr4ZWyyYXquzhPzv36EXoDct4dT9CFf8ENwcIUfSFptP8Pc5zlUbf4b2mpYZlneKseV71pIyrbHhCtuxPnBy00JR7PUaIH");

    
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time for your appointment');
      return;
    }

    let pay = async () => {
      console.log("halo")
      let response = await fetch('http://localhost:5000/bookAptPay', {
        method : 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body : JSON.stringify({"date" : selectedDate, "time" : selectedTime, "name" : localStorage.getItem("name"), "mode" : mode, "email" : localStorage.getItem("email"), "id" : id})
      })
      console.log("halo2")

      const res = await response.json();
      console.log(res)
      const red = stripe.redirectToCheckout({
        sessionId : res.id
      })
    }
    pay();
    // let bookApt = async () => {
    //   let response = await fetch('http://localhost:5000/bookAppointment', {
    //     method : 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //     body : JSON.stringify({"date" : selectedDate, "time" : selectedTime, "name" : localStorage.getItem("name"), "mode" : mode, "email" : localStorage.getItem("email"), "id" : id})
    //   })

    //   const res = await response.json();
    //   const red = stripe.redirectToCheckout({
    //     sessionId : res.sesId
    //   })
    // }
    // bookApt();
    // alert(`Appointment request sent for ${selectedDate.slice(0,2)}/${selectedDate.slice(2,4)}/${selectedDate.slice(4)} at ${selectedTime.slice(0,2)}:${selectedTime.slice(2,4)}`);
    // window.location.reload();
    // In a real app, this would make an API call to book the appointment
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/doctors" className="text-primary hover:underline flex items-center">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to doctors list
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Info Card */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <CardHeader className="pb-0 text-center">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{doctor.name}</CardTitle>
                <CardDescription className="text-lg font-medium text-primary mb-1">
                  {doctor.specialty}
                </CardDescription>
                <div className="flex items-center space-x-1 mt-1 mb-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {doctor.telehealth && (
                    <Badge variant="outline" className="bg-blue-50">
                      <Video className="mr-1 h-3 w-3" />
                      Telehealth
                    </Badge>
                  )}
                  {doctor.inPerson && (
                    <Badge variant="outline" className="bg-green-50">
                      <MapPin className="mr-1 h-3 w-3" />
                      In-Person
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Practice Location</p>
                    <p className="text-muted-foreground">{doctor.hospital}</p>
                    <p className="text-muted-foreground">{doctor.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Experience</p>
                    <p className="text-muted-foreground">{doctor.experience}</p>
                  </div>
                </div>
                
               
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Book Appointment</p>
                    <p className="text-muted-foreground">Call the clinic directly</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email Inquiries</p>
                    <p className="text-muted-foreground">contact@example.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" onClick={() => handleBookAppointment("online")}>
                Book Video Consultation
              </Button>
              <p className="text-sm text-center mt-3 text-muted-foreground">
                Consultation Fee: ${doctor.consultationFee}
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Profile Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {doctor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{doctor.about}</p>
                  
                  <h3 className="font-medium text-lg mt-6 mb-3">Areas of Expertise</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {doctor.services.map((service: string, index: number) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education & Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {doctor.education.map((edu: any, index: number) => (
                      <div key={index} className="border-l-2 border-primary pl-4 pb-2">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-medium text-lg mt-6 mb-3">Professional Experience</h3>
                  <p className="text-muted-foreground">
                    {doctor.name} has {doctor.experience} of clinical experience in treating various conditions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.services.map((service: string, index: number) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-4">
                          <p className="font-medium">{service}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>
                    Overall Rating: {doctor.rating}/5 ({doctor.reviewCount} reviews)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Mock reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Jane P.</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">2 months ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Dr. {doctor.name.split(' ')[1]} is very knowledgeable and took the time to explain everything clearly. 
                        I felt well cared for during my appointment.
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>RM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Robert M.</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">4 months ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Great doctor with excellent bedside manner. The only issue was the wait time at the clinic, 
                        but the care I received was worth it.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Appointment Booking Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>
                Select your preferred date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* <div>
                  <h3 className="font-medium mb-2">Available Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableDays.map((day: string, index: number) => (
                      <Button 
                        key={index} 
                        variant={selectedDate === day ? "default" : "outline"}
                        onClick={() => setSelectedDate(day)}
                        className="flex-1 min-w-[100px]"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {day}
                      </Button>
                    ))}
                  </div>
                </div> */}

                <div>
                  <h3 className="font-medium mb-2">Available Dates</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.timeSlots && doctor.timeSlots.map((slotObj: any, index: number) => {
                      const dateHere = Object.keys(slotObj)[0]; // Get the date string
                      return (
                        <Button 
                          key={index} 
                          variant={selectedDate === dateHere ? "default" : "outline"}
                          onClick={() => setSelectedDate(dateHere)}
                          className="flex-1 min-w-[100px]"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateHere.slice(0,2)}/{dateHere.slice(2,4)}/{dateHere.slice(4,8)}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                
                <div>
                <h3 className="font-medium mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {doctor.timeSlots && selectedDate &&
                    // Find the matching date object
                    (doctor.timeSlots.find((slotObj: any) => Object.keys(slotObj)[0] === selectedDate)?.[selectedDate] || [])
                      .map((time: number, index: number) => (
                        <Button 
                          key={index} 
                          variant={selectedTime === time.toString() ? "default" : "outline"}
                          onClick={() => setSelectedTime(time.toString())}
                          className="justify-center"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {Math.floor(time / 100)}:
                          {time % 100 > 9 ? time % 100 : `0${time % 100}`} 
                          {time >= 1200 ? " PM" : " AM"}
                        </Button>
                      ))
                  }
                </div>
              </div>

              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleBookAppointment("offline")}
                disabled={!selectedDate || !selectedTime}
              >
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
