
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const teamMembers = [
  {
    name: 'Dr. Jane Smith',
    role: 'Chief Medical Officer',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Dr. Smith has over 15 years of experience in healthcare management and clinical practice.'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Head of Cardiology',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Specializing in interventional cardiology with a focus on preventive care and heart health.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Patient Experience',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Sarah leads our initiatives to improve patient experiences and healthcare outcomes.'
  },
  {
    name: 'Dr. David Williams',
    role: 'Chief Technology Officer',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    bio: 'Dr. Williams combines medical expertise with technological innovation to improve healthcare delivery.'
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">About MediChain</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Transforming healthcare through innovation, compassion, and accessibility.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            MediChain is dedicated to making healthcare accessible, efficient, and patient-centered. 
            We believe that technology can transform the healthcare experience, making it more 
            convenient for patients and more effective for providers.
          </p>
          <p className="text-muted-foreground">
            Our platform connects patients with qualified healthcare professionals through a 
            seamless digital experience, while maintaining the highest standards of care and privacy.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-muted-foreground mb-4">
            We envision a future where healthcare is accessible to everyone, regardless of location, 
            schedule, or mobility constraints. We're building a world where patients can receive 
            high-quality care when and where they need it.
          </p>
          <p className="text-muted-foreground">
            Through continuous innovation and collaboration with healthcare providers, we're working 
            to make healthcare more responsive, personalized, and integrated.
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Patient-Centered</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                We put patients at the center of everything we do, designing our services around their needs and preferences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                We continuously seek new ways to improve healthcare delivery and patient outcomes through technology.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Quality</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                We maintain the highest standards of care, ensuring that our platform connects patients with qualified professionals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="mb-1">{member.name}</CardTitle>
                <CardDescription className="mb-4">{member.role}</CardDescription>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Have questions about our services or want to learn more about how we can help you?
          Our team is here to assist you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                123 Healthcare Avenue<br />
                Medical District<br />
                New York, NY 10001
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Email: info@medichain.com<br />
                Phone: (555) 123-4567<br />
                Fax: (555) 123-4568
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Hours</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Monday-Friday: 8am-8pm<br />
                Saturday: 9am-5pm<br />
                Sunday: Closed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
