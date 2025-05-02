
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">MediChain</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Providing quality healthcare services with innovative technology solutions for a healthier tomorrow.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary inline-flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-primary inline-flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-400 hover:text-primary inline-flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary inline-flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Teleconsultation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-primary inline-flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-400">123 Healthcare Blvd, Medical District, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-400">info@medichain.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on health tips and services.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" 
              />
              <Button>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MediChain. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-primary text-sm">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-400 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-primary text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
