
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DashboardHeader: React.FC = () => {
  return (
    <header className="border-b border-border bg-card h-16 px-4 flex items-center justify-between">
      <div className="flex items-center w-2/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-full pl-9 h-9"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start py-3">
                <div className="font-medium">Appointment Reminder</div>
                <div className="text-sm text-muted-foreground">Your appointment with Dr. Smith is tomorrow at 10:00 AM</div>
                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start py-3">
                <div className="font-medium">Prescription Updated</div>
                <div className="text-sm text-muted-foreground">Dr. Johnson has updated your prescription</div>
                <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start py-3">
                <div className="font-medium">New Message</div>
                <div className="text-sm text-muted-foreground">You have a new message from Dr. Williams</div>
                <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-primary font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
