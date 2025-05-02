
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Clock, Stethoscope, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

// Mock data for doctors
// const doctors = [
//   {
//     id: "1",
//     name: "Dr. Sarah Johnson",
//     specialty: "Cardiologist",
//     location: "New York, NY",
//     hospital: "City Medical Center",
//     experience: "15 years",
//     rating: 4.9,
//     reviewCount: 127,
//     image: "https://randomuser.me/api/portraits/women/64.jpg",
//     available: true,
//     nextAvailable: "Today, 2:00 PM",
//     telehealth: true
//   },
//   {
//     id: "2",
//     name: "Dr. Michael Williams",
//     specialty: "Neurologist",
//     location: "Boston, MA",
//     hospital: "Metropolitan Neurology Institute",
//     experience: "12 years",
//     rating: 4.7,
//     reviewCount: 98,
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     available: true,
//     nextAvailable: "Tomorrow, 10:00 AM",
//     telehealth: true
//   },
//   {
//     id: "3",
//     name: "Dr. Emma Rodriguez",
//     specialty: "Pediatrician",
//     location: "Chicago, IL",
//     hospital: "Children's Wellness Center",
//     experience: "8 years",
//     rating: 4.8,
//     reviewCount: 154,
//     image: "https://randomuser.me/api/portraits/women/45.jpg",
//     available: false,
//     nextAvailable: "Mon, 9:00 AM",
//     telehealth: false
//   },
//   {
//     id: "4",
//     name: "Dr. James Chen",
//     specialty: "Dermatologist",
//     location: "San Francisco, CA",
//     hospital: "Pacific Dermatology Clinic",
//     experience: "10 years",
//     rating: 4.6,
//     reviewCount: 86,
//     image: "https://randomuser.me/api/portraits/men/67.jpg",
//     available: true,
//     nextAvailable: "Today, 4:30 PM",
//     telehealth: true
//   }
// ];

const specialties = [
  "All Specialties", "Cardiologist", "Neurologist", "Pediatrician", "Dermatologist", 
  "Orthopedic Surgeon", "Gynecologist", "Psychiatrist", "Ophthalmologist"
];

const DoctorsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [telehealthOnly, setTelehealthOnly] = useState(false);
  const [availableToday, setAvailableToday] = useState(false);
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
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
          const data = await response.json(); // ✅ only call once
          console.log("fetched doctors:", data);
          setDoctors(data); // ✅ assume data is an array
        } else {
          console.log("Fetch failed with status", response.status);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    
  
    getDoctors();
  }, []);
  
    useEffect(() => {setDoctors(doctors); console.log(doctors)}, [doctors])
  
  // Filter doctors based on search and filters
  const filteredDoctors = doctors.length > 0 ? doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = specialty === 'All Specialties' || doctor.specialty === specialty;
    
    const matchesTelehealth = !telehealthOnly || doctor.telehealth;
    
    const matchesAvailability = !availableToday || 
      (doctor.available && doctor.nextAvailable.includes('Today'));
    
    return matchesSearch && matchesSpecialty && matchesTelehealth && matchesAvailability;
  }) : ([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Find Doctors</h1>
          <p className="text-muted-foreground">
            Browse our network of trusted healthcare professionals
          </p>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, specialty, or location"
              className="pl-10 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        {/* <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Specialty</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="available-today" 
                    checked={availableToday}
                    onCheckedChange={(checked) => setAvailableToday(checked as boolean)}
                  />
                  <label
                    htmlFor="available-today"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Available today
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Consultation Type</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="telehealth-only" 
                    checked={telehealthOnly}
                    onCheckedChange={(checked) => setTelehealthOnly(checked as boolean)}
                  />
                  <label
                    htmlFor="telehealth-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Telehealth only
                  </label>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => {
                setSearchTerm('');
                setSpecialty('All Specialties');
                setTelehealthOnly(false);
                setAvailableToday(false);
              }}>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div> */}
        
        {/* Doctors List */}
        <div className="lg:col-span-3">
          {filteredDoctors.length > 0 ? (
            <div className="space-y-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex flex-col items-center md:items-start md:flex-row">
                      <Avatar className="h-24 w-24 mb-4 md:mb-0 md:mr-6">
                        <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center mb-2">
                          <h3 className="text-xl font-bold">{doctor.name}</h3>
                          <div className="flex items-center md:ml-4 mt-1 md:mt-0">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{doctor.rating}</span>
                            <span className="text-muted-foreground text-sm ml-1">({doctor.reviewCount})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-primary mb-2">
                          <Stethoscope className="h-4 w-4 mr-1" />
                          <span>{doctor.specialty}</span>
                          {doctor.telehealth && (
                            <Badge variant="outline" className="ml-3 bg-blue-50">
                              <Video className="mr-1 h-3 w-3" />
                              Telehealth
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{doctor.hospital}, {doctor.location}</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{doctor.experience} experience</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l p-6 bg-muted/10 md:ml-auto">
                      
                      
                      <div className="flex flex-col space-y-2 mt-4">
                        <Button asChild>
                          <Link to={`/doctors/${doctor.id}`}>View Profile / Book Appointment</Link>
                        </Button>
                        {/* <Button variant="outline">Book Appointment</Button> */}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <CardTitle className="mb-2">No doctors found</CardTitle>
              <CardDescription>
                Try adjusting your search or filters to find available doctors.
              </CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
