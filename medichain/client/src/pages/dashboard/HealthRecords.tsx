
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, Share2, Lock } from 'lucide-react';

const HealthRecords: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Health Records</h1>
        <p className="text-muted-foreground">Securely manage and share your health records.</p>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload New Record
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Records
        </Button>
      </div>

      <Tabs defaultValue="medical">
        <TabsList>
          <TabsTrigger value="medical">Medical Records</TabsTrigger>
          <TabsTrigger value="lab">Lab Results</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
        </TabsList>
        
        <TabsContent value="medical" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Your complete medical history and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-blue-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Annual Physical Examination</h3>
                        <p className="text-sm text-muted-foreground">Dr. Sarah Johnson • April 2, 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-blue-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Cardiology Consultation</h3>
                        <p className="text-sm text-muted-foreground">Dr. Michael Chen • March 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-blue-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Immunization Records</h3>
                        <p className="text-sm text-muted-foreground">Public Health Clinic • January 10, 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
              <CardDescription>Blood tests, urine analysis, and other lab work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-green-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Complete Blood Count (CBC)</h3>
                        <p className="text-sm text-muted-foreground">Central Laboratory • March 28, 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-green-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Lipid Profile</h3>
                        <p className="text-sm text-muted-foreground">Central Laboratory • March 28, 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>Your medication prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-purple-500 mr-3" />
                      <div>
                        <h3 className="font-medium">Antibiotic Prescription</h3>
                        <p className="text-sm text-muted-foreground">Dr. James Wilson • April 5, 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Imaging</CardTitle>
              <CardDescription>X-rays, MRIs, CT scans, and other imaging</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium">No imaging records yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">Upload your imaging records to view them here</p>
                  <Button className="mt-4">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthRecords;
