
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, Phone, Video, Star, MapPin, CheckCircle2, 
  Shield, Clock, ArrowRight, Calendar, Stethoscope 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../components/ui/use-toast';
import {loadStripe} from '@stripe/stripe-js';


type EmergencyDoctor = {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  languages: string[];
  image: string;
  rating: number;
  location: string;
  availability: boolean;
  lastActive: string;
};

const EmergencyConsult: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(3);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [symptomDescription, setSymptomDescription] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

   const url = decodeURIComponent(window.location.pathname);
    const encodedParts = url.split('/')[3]?.split('_____') || [];
    const nav = useNavigate();
    const hasRun = useRef(false);

  // Mock emergency doctors data
  // const emergencyDoctors: EmergencyDoctor[] = [
  //   {
  //     id: 'doc1',
  //     name: 'Dr. Rajesh Kumar',
  //     specialization: 'Emergency Medicine',
  //     qualification: 'MD, MBBS',
  //     experience: 8,
  //     languages: ['English', 'Hindi', 'Punjabi'],
  //     image: '/placeholder.svg',
  //     rating: 4.8,
  //     location: 'Delhi',
  //     availability: true,
  //     lastActive: '2 min ago',
  //   },
  //   {
  //     id: 'doc2',
  //     name: 'Dr. Sunita Sharma',
  //     specialization: 'Cardiology',
  //     qualification: 'MD, DM, MBBS',
  //     experience: 12,
  //     languages: ['English', 'Hindi'],
  //     image: '/placeholder.svg',
  //     rating: 4.9,
  //     location: 'Mumbai',
  //     availability: true,
  //     lastActive: 'Online',
  //   },
  //   {
  //     id: 'doc3',
  //     name: 'Dr. Anand Gupta',
  //     specialization: 'General Medicine',
  //     qualification: 'MBBS, DNB',
  //     experience: 5,
  //     languages: ['English', 'Hindi', 'Bengali'],
  //     image: '/placeholder.svg',
  //     rating: 4.6,
  //     location: 'Kolkata',
  //     availability: true,
  //     lastActive: '5 min ago',
  //   },
  //   {
  //     id: 'doc4',
  //     name: 'Dr. Priya Mehta',
  //     specialization: 'Emergency Medicine',
  //     qualification: 'MD, MBBS',
  //     experience: 7,
  //     languages: ['English', 'Hindi', 'Gujarati'],
  //     image: '/placeholder.svg',
  //     rating: 4.7,
  //     location: 'Ahmedabad',
  //     availability: true,
  //     lastActive: 'Online',
  //   },
  // ];
  let [emergencyDoctors, setEmergencyDoctors] = useState([]);
  let [erPatients, setErPatients] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("loggedIn") === "doctor") {
      let fn = async () => {
        let response = await fetch('http://localhost:5000/getErPatients', {
          method : 'POST',
          headers : {'Content-type' : 'application/json'},
          body : JSON.stringify({"doctor" : localStorage.getItem("name")})
        })
        let res = await response.json();
        setErPatients(res.patients)
      }
      fn();
    }
    
  }, [])
  useEffect(()=> {console.log(erPatients)}, [erPatients])

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    console.log(encodedParts);
      if(localStorage.getItem("loggedIn") === "patient") {
        
        let fetchdata =  async () => {


          let response = await fetch('http://localhost:5000/updateEr', {
            method : 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body : JSON.stringify({"name" : encodedParts[1], "doc" : encodedParts[0]})
          })
   
        }
        fetchdata();
      }
      
  }, [])

  useEffect(() => {
    let fn = async () => {
      let response = await fetch('http://localhost:5000/availableEr', {
        method : 'GET',
        headers : {'Content-type' : 'application/json'},
      })
      let res = await response.json();
      setEmergencyDoctors(res);
    }
    fn();
  }, [])
  useEffect(() => {
    console.log(emergencyDoctors)
  }, [emergencyDoctors])
  const handleContinue = () => {
    if (step === 1) {
      // if (!symptomDescription.trim()) {
      //   toast({
      //     title: "Information needed",
      //     description: "Please describe your symptoms or emergency",
      //     variant: "destructive",
      //   });
      //   return;
      // }
      setStep(2);
    } 
    else if (step === 3) {
      // Process payment and start consultation
      window.location.href = `http://localhost:3000/${localStorage.getItem('name')}_____${encodedParts[0]}`

    }
  };

  const selectDoctor = (doctor: EmergencyDoctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="p-2 rounded-full bg-red-500/10">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold ml-3">Emergency Consultation</h1>
          </div>
          
          {localStorage.getItem("loggedIn") !== "doctor" && (
             <div>
             <Card className="shadow-md">
               <CardContent className="pt-6">
                 <div className="mb-6">
                   <div className="flex items-center space-x-2 mb-6">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                       1
                     </div>
                     <div className={`flex-1 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                       2
                     </div>
                     <div className={`flex-1 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                       3
                     </div>
                   </div>
                   
                   {step === 1 && (
                     <div className="space-y-4">
                       <h2 className="text-xl font-semibold">Teleconnect Emergency</h2>
                       <p className="text-muted-foreground">
                         Select a doctor and wait patiently. Amount will be refunded in case the doctor is unable to join.
                       </p>
                       
                       {/* <Textarea 
                         placeholder="Describe your symptoms or emergency situation..."
                         className="min-h-[150px]"
                         value={symptomDescription}
                         onChange={(e) => setSymptomDescription(e.target.value)}
                       /> */}
                       
                       <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                         <div className="font-medium flex items-center">
                           <Shield className="h-4 w-4 text-primary mr-2" />
                           Important Information
                         </div>
                         <p className="text-sm text-muted-foreground">
                           For life-threatening emergencies, please call your country's emergency services (e.g., 108 in India or 911 in the US) immediately.
                         </p>
                       </div>
                     </div>
                   )}
                   
                   {step === 2 && (
                     <div className="space-y-4">
                       <h2 className="text-xl font-semibold">Select an Available Doctor</h2>
                       <p className="text-muted-foreground">
                         These doctors are currently available for emergency consultations. The consultation fee is ₹100.
                       </p>
                       
                       <div className="grid grid-cols-1 gap-4 mt-4">
                         {emergencyDoctors.map((doctor) => (
                           <Card 
                             key={doctor.id} 
                             className={`cursor-pointer border-2 transition-all ${selectedDoctor?.id === doctor.id ? 'border-primary' : 'border-transparent hover:border-muted'}`}
                             onClick={() => selectDoctor(doctor)}
                           >
                             <CardContent className="p-4">
                               <div className="flex items-start">
                                 <Avatar className="h-16 w-16 mr-4">
                                   <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                                   <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                 </Avatar>
                                 
                                 <div className="flex-1">
                                   <div className="flex items-center justify-between mb-1">
                                     <h3 className="font-semibold">{doctor.name}</h3>
                                     <Badge variant="outline" className="flex items-center gap-1">
                                       <Clock className="h-3 w-3" />
                                       {doctor.lastActive}
                                     </Badge>
                                   </div>
                                   
                                   <p className="text-sm text-muted-foreground mb-1">
                                     {doctor.specialization} • {doctor.experience} Years Experience
                                   </p>
                                   
                                   <div className="flex items-center text-sm mb-2">
                                     <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                                     <span className="text-muted-foreground">{doctor.location}</span>
                                     <span className="mx-2">•</span>
                                     <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                     <span>{doctor.rating}</span>
                                   </div>
                                   
                                   <div className="flex flex-wrap gap-2 mt-2">
                                     {doctor.languages.map((language, idx) => (
                                       <Badge key={idx} variant="secondary" className="text-xs">
                                         {language}
                                       </Badge>
                                     ))}
                                   </div>
                                 </div>
                                 
                                 <div className="flex flex-col items-end gap-2">
                                   <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                                     Available Now
                                   </Badge>
                                 </div>
                               </div>
                             </CardContent>
                           </Card>
                         ))}
                       </div>
                     </div>
                   )}
                   
                   {step === 3 && selectedDoctor && (
                     <div className="space-y-4">
                       <h2 className="text-xl font-semibold">Consultation Payment</h2>
                       <p className="text-muted-foreground">
                         Complete the payment to start your emergency consultation with {selectedDoctor.name}.
                       </p>
                       
                       <Card className="bg-muted/30">
                         <CardContent className="p-4">
                           <div className="flex items-center justify-between">
                             <div className="flex items-center">
                               <Avatar className="h-12 w-12 mr-3">
                                 <AvatarImage src={selectedDoctor.image} alt={selectedDoctor.name} />
                                 <AvatarFallback>{selectedDoctor.name.charAt(0)}</AvatarFallback>
                               </Avatar>
                               <div>
                                 <h3 className="font-medium">{selectedDoctor.name}</h3>
                                 <p className="text-sm text-muted-foreground">
                                   {selectedDoctor.specialization}
                                 </p>
                               </div>
                             </div>
                             <div className="text-right">
                               <div className="text-sm text-muted-foreground">Consultation Fee</div>
                               <div className="text-xl font-bold">₹100</div>
                             </div>
                           </div>
                         </CardContent>
                       </Card>
                       
                       <div className="space-y-4 mt-4">
                         <div>
                           <h3 className="text-base font-medium mb-2">Payment Method</h3>
                           <Tabs defaultValue="card" className="w-full">
                             <TabsList className="grid w-full grid-cols-3">
                               <TabsTrigger value="card">Card</TabsTrigger>
                               <TabsTrigger value="upi">UPI</TabsTrigger>
                               <TabsTrigger value="wallet">Wallet</TabsTrigger>
                             </TabsList>
                             <TabsContent value="card" className="space-y-4 mt-4">
                               <Input placeholder="Card Number" />
                               <div className="grid grid-cols-2 gap-4">
                                 <Input placeholder="MM/YY" />
                                 <Input placeholder="CVV" />
                               </div>
                               <Input placeholder="Cardholder Name" />
                             </TabsContent>
                             <TabsContent value="upi" className="space-y-4 mt-4">
                               <Input placeholder="UPI ID (e.g., name@upi)" />
                             </TabsContent>
                             <TabsContent value="wallet" className="space-y-4 mt-4">
                               <div className="grid grid-cols-3 gap-2">
                                 <Button variant="outline" className="h-auto py-4 flex flex-col">
                                   <img src="/placeholder.svg" alt="PayTM" className="h-6 mb-1" />
                                   <span className="text-xs">PayTM</span>
                                 </Button>
                                 <Button variant="outline" className="h-auto py-4 flex flex-col">
                                   <img src="/placeholder.svg" alt="PhonePe" className="h-6 mb-1" />
                                   <span className="text-xs">PhonePe</span>
                                 </Button>
                                 <Button variant="outline" className="h-auto py-4 flex flex-col">
                                   <img src="/placeholder.svg" alt="GPay" className="h-6 mb-1" />
                                   <span className="text-xs">GPay</span>
                                 </Button>
                               </div>
                             </TabsContent>
                           </Tabs>
                         </div>
                       </div>
                       
                       <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                         <div className="font-medium flex items-center">
                           <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                           What's included
                         </div>
                         <ul className="text-sm text-muted-foreground space-y-1">
                           <li className="flex items-start">
                             <ArrowRight className="h-3 w-3 mt-1 mr-2" />
                             15-minute video or audio consultation
                           </li>
                           <li className="flex items-start">
                             <ArrowRight className="h-3 w-3 mt-1 mr-2" />
                             Digital prescription (if needed)
                           </li>
                           <li className="flex items-start">
                             <ArrowRight className="h-3 w-3 mt-1 mr-2" />
                             Follow-up chat for 24 hours
                           </li>
                         </ul>
                       </div>
                     </div>
                   )}
                 </div>
                 
                 <div className="flex justify-between mt-8">
                   {step > 1 ? (
                     <Button variant="outline" onClick={() => setStep(prev => prev === 3 ? 2 : 1 as 1 | 2 | 3)}>
                       Back
                     </Button>
                   ) : (
                     <Button variant="outline" onClick={() => navigate('/')}>
                       Cancel
                     </Button>
                   )}
                   <Button style = {{display : step === 2 ? 'flex' : 'none'}} onClick = {() => {
                    console.log("ugh")
                    if (!selectedDoctor) {
                      toast({
                        title: "Selection needed",
                        description: "Please select a doctor to continue",
                        variant: "destructive",
                      })};
                      console.log("pay")
                      
                      let pay = async () => {
                        console.log( localStorage.getItem("name"))
                            const stripe = await loadStripe("pk_test_51RDQUr4ZWyyYXquzhPzv36EXoDct4dT9CFf8ENwcIUfSFptP8Pc5zlUbf4b2mpYZlneKseV71pIyrbHhCtuxPnBy00JR7PUaIH");
                        
                        console.log("halo")
                        let response = await fetch('http://localhost:5000/bookEr', {
                          method : 'POST',
                          headers: {
                            'Content-type': 'application/json',
                          },
                          body : JSON.stringify({"name" : localStorage.getItem("name"), doctor : selectedDoctor.id})
                        })
                        console.log("halo2")
                  
                        const res = await response.json();
                        console.log(res)
                        const red = stripe.redirectToCheckout({
                          sessionId : res.id
                        })
                      }
                      pay();
                   }}>Pay</Button>
                   <Button onClick={handleContinue} style = {{display : step === 2 ? 'none' : 'flex'}}>
                     {step === 1 && 'Continue'}
                     {step === 2 && 'Continue to Payment'}
                     {step === 3 && 'Join the room'}
                   </Button>
                 </div>
               </CardContent>
             </Card>
             
             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
               <Card>
                 <CardContent className="pt-6">
                   <div className="flex items-center mb-3">
                     <Phone className="h-5 w-5 text-primary mr-2" />
                     <h3 className="font-medium">Voice Consultation</h3>
                   </div>
                   <p className="text-sm text-muted-foreground">
                     Talk directly to a doctor over a phone call for immediate assistance.
                   </p>
                 </CardContent>
               </Card>
               
               <Card>
                 <CardContent className="pt-6">
                   <div className="flex items-center mb-3">
                     <Video className="h-5 w-5 text-primary mr-2" />
                     <h3 className="font-medium">Video Consultation</h3>
                   </div>
                   <p className="text-sm text-muted-foreground">
                     Face-to-face consultation with a doctor through our secure video platform.
                   </p>
                 </CardContent>
               </Card>
               
               <Card>
                 <CardContent className="pt-6">
                   <div className="flex items-center mb-3">
                     <Calendar className="h-5 w-5 text-primary mr-2" />
                     <h3 className="font-medium">Schedule for Later</h3>
                   </div>
                   <p className="text-sm text-muted-foreground">
                     Book an appointment with a specialist for a future consultation.
                   </p>
                 </CardContent>
               </Card>
             </div>
             </div>
          )}
          {localStorage.getItem("loggedIn") === "doctor" && (
            <div>
              <div className="space-y-4">
                    {erPatients.map((appointment : any) => (
                      <div 
                        key={appointment.id} 
                        className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center mb-4 md:mb-0">
                          
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{appointment}</p>
                          
                            </div>
                          </div>
                        </div>
                        
                        <Button size="sm" onClick = {() => {
                              window.location.href = `http://localhost:3000/${localStorage.getItem('name')}_____${localStorage.getItem('name')}`
                            }}>
                              <>
                                  <Video className="h-4 w-4 mr-2" />
                                  Join
                                </>
                            </Button>
                      </div>
                    ))}
                  </div>
            </div>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default EmergencyConsult;
