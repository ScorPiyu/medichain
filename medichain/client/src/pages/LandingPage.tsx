import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Calendar, Clock, Shield, Star, Users } from 'lucide-react';
import DevNavigation from '../components/DevNavigation';

const LandingPage: React.FC = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  let [auth, setAuth] = useState(localStorage.getItem('loggedIn') === "patient" ? "patient" : localStorage.getItem("loggedIn") === "doctor" ? "doctor" : null)
  
  return (
    <div>
      {/* Hero Section */}
      <section style = {{marginBottom : auth === 'doctor' ? '-70px' : '-30px'}} className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Healthcare Made Simple
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with top doctors, book appointments, and manage your health records all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button style = {{display : auth === 'doctor' ? 'none' : 'flex'}} size="lg" asChild>
              <Link to="/doctors">
                Find a Doctor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button style = {{display : auth ? 'none' : 'flex'}}size="lg" variant="outline" asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MediChain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Doctors</h3>
                <p className="text-muted-foreground">
                  Connect with verified specialists across multiple disciplines for quality care.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Scheduling</h3>
                <p className="text-muted-foreground">
                  Book appointments instantly and receive reminders to never miss a consultation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Records</h3>
                <p className="text-muted-foreground">
                  Your health data is encrypted and securely stored with the highest privacy standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up and complete your health profile in minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Find a Doctor</h3>
              <p className="text-muted-foreground">
                Browse specialists and read reviews from other patients.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
              <p className="text-muted-foreground">
                Select a convenient time slot and confirm your booking.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Care</h3>
              <p className="text-muted-foreground">
                Connect via video call or visit in-person for your consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-muted-foreground mb-4">
                  "MediChain has transformed how I manage my healthcare. The video consultations save me so much time, and I love having all my records in one place."
                </p>
                <p className="font-medium">- Sarah J.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a busy professional, I appreciate how easy it is to book appointments and get reminders. The doctors are excellent and really take their time with you."
                </p>
                <p className="font-medium">- Michael T.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-muted-foreground mb-4">
                  "The emergency consultation feature was a lifesaver when my child had a high fever at night. Got medical advice within minutes!"
                </p>
                <p className="font-medium">- Priya R.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your health?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their healthcare journey with MediChain.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {isDevelopment && <DevNavigation />}
    </div>
  );
};

export default LandingPage;
