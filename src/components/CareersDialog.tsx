import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Briefcase, Truck, Package, DollarSign, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CareersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface JobListing {
  id: string;
  title: string;
  hourlyRate: string;
  tips?: boolean;
  icon: React.ReactNode;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export function CareersDialog({ open, onOpenChange }: CareersDialogProps) {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    driversLicense: '',
    availability: '',
    experience: '',
    qualifications: '',
    whyJoin: '',
    resumeFile: null as File | null,
  });

  const jobs: JobListing[] = [
    {
      id: 'delivery-driver',
      title: 'Delivery Driver',
      hourlyRate: '$15.50/hr',
      tips: true,
      icon: <Truck className="size-8 text-cyan-400" />,
      responsibilities: [
        'Deliver food orders to customers in a timely and professional manner',
        'Maintain vehicle cleanliness and ensure food safety during transport',
        'Communicate with customers regarding delivery status',
        'Handle cash and card payments accurately',
        'Navigate efficiently using GPS and local knowledge',
      ],
      requirements: [
        'Valid driver\'s license',
        'Reliable vehicle with insurance',
        'Positive attitude and customer service skills',
        'Ability to work after 12:00 PM (late-night shifts)',
        'Good communication skills',
        'Basic smartphone proficiency',
      ],
      benefits: [
        'Competitive hourly rate + tips',
        'Flexible scheduling',
        'Gas reimbursement program',
        'Employee meal discounts',
        'Weekly pay',
      ],
    },
    {
      id: 'order-fulfillment',
      title: 'Order Fulfillment Specialist',
      hourlyRate: '$13.50/hr',
      tips: false,
      icon: <Package className="size-8 text-purple-400" />,
      responsibilities: [
        'Prepare and package customer orders accurately',
        'Ensure quality control and attention to detail',
        'Maintain clean and organized work station',
        'Coordinate with kitchen staff and delivery drivers',
        'Process orders through our digital system',
      ],
      requirements: [
        'Strong attention to detail',
        'Positive attitude and team player mentality',
        'Ability to work in fast-paced environment',
        'No experience needed - willing to train!',
        'Comfortable standing for extended periods',
        'Ability to lift up to 25 lbs',
      ],
      benefits: [
        'Competitive starting wage',
        'Comprehensive training program',
        'Flexible scheduling',
        'Employee meal discounts',
        'Growth opportunities',
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resumeFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.age || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedJob?.id === 'delivery-driver' && !formData.driversLicense) {
      toast.error('Driver\'s license number is required for Delivery Driver position');
      return;
    }

    // Create application object
    const application = {
      id: `APP-${Date.now()}`,
      jobId: selectedJob?.id,
      jobTitle: selectedJob?.title,
      applicantInfo: formData,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // Store in localStorage
    const existingApplications = JSON.parse(localStorage.getItem('midnightMunchiesApplications') || '[]');
    localStorage.setItem('midnightMunchiesApplications', JSON.stringify([...existingApplications, application]));

    console.log('Job Application Submitted:', application);

    toast.success('Application submitted successfully!', {
      description: `We'll review your application for ${selectedJob?.title} and get back to you soon.`,
    });

    // Reset form
    setFormData({
      fullName: '',
      age: '',
      email: '',
      phone: '',
      address: '',
      driversLicense: '',
      availability: '',
      experience: '',
      qualifications: '',
      whyJoin: '',
      resumeFile: null,
    });

    setSelectedJob(null);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] bg-gradient-to-br from-purple-950/95 to-black/95 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white flex items-center gap-2">
            <Briefcase className="size-6 text-purple-400" />
            {selectedJob ? `Apply for ${selectedJob.title}` : 'Careers at Midnight Munchies'}
          </DialogTitle>
          {!selectedJob && (
            <p className="text-white/60 text-sm">Join our team and help satisfy late-night cravings!</p>
          )}
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          {!selectedJob ? (
            /* Job Listings */
            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
                <h3 className="text-white mb-2">Why Work With Us?</h3>
                <p className="text-white/70 text-sm">
                  Midnight Munchies is more than just a late-night food service - we're a team dedicated to bringing joy to hungry customers. We offer competitive pay, flexible hours, and a fun work environment.
                </p>
              </div>

              {jobs.map(job => (
                <Card key={job.id} className="bg-gradient-to-br from-purple-900/40 to-black/60 border-purple-500/30 hover:border-purple-400/60 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                          {job.icon}
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl">{job.title}</CardTitle>
                          <CardDescription className="text-white/60 flex items-center gap-2 mt-1">
                            <DollarSign className="size-4" />
                            {job.hourlyRate}
                            {job.tips && <Badge className="bg-green-500/20 text-green-300 border-green-500/30">+ Tips</Badge>}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white text-sm mb-2">Responsibilities:</h4>
                      <ul className="space-y-1">
                        {job.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white text-sm mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-purple-400 mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => setSelectedJob(job)}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                    >
                      Apply for this Position
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-6">
                <p className="text-white/70 text-sm">
                  <strong className="text-white">Equal Opportunity Employer:</strong> Midnight Munchies is committed to creating a diverse and inclusive workplace. We welcome applications from all qualified individuals.
                </p>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToJobs}
                className="text-white/70 hover:text-white mb-4"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back to Job Listings
              </Button>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  {selectedJob.icon}
                  <div>
                    <h3 className="text-white">{selectedJob.title}</h3>
                    <p className="text-white/60 text-sm">{selectedJob.hourlyRate}{selectedJob.tips && ' + Tips'}</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-purple-500/20" />

              <div className="space-y-4">
                <h3 className="text-white text-lg">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-white/5 border-purple-500/30 text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-white">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="bg-white/5 border-purple-500/30 text-white"
                      placeholder="18"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/5 border-purple-500/30 text-white"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/5 border-purple-500/30 text-white"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-white/5 border-purple-500/30 text-white"
                    placeholder="123 Main St, Philadelphia, PA"
                  />
                </div>

                {selectedJob.id === 'delivery-driver' && (
                  <div className="space-y-2">
                    <Label htmlFor="driversLicense" className="text-white">Driver's License Number *</Label>
                    <Input
                      id="driversLicense"
                      name="driversLicense"
                      value={formData.driversLicense}
                      onChange={handleInputChange}
                      className="bg-white/5 border-purple-500/30 text-white"
                      placeholder="PA-1234567"
                      required
                    />
                  </div>
                )}
              </div>

              <Separator className="bg-purple-500/20" />

              <div className="space-y-4">
                <h3 className="text-white text-lg">Availability & Experience</h3>

                <div className="space-y-2">
                  <Label htmlFor="availability" className="text-white">Availability</Label>
                  <Textarea
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="bg-white/5 border-purple-500/30 text-white min-h-[80px]"
                    placeholder="Please describe your available days and hours (e.g., Mon-Fri after 8PM, weekends anytime)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-white">Relevant Experience</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="bg-white/5 border-purple-500/30 text-white min-h-[100px]"
                    placeholder="Describe any relevant work experience (customer service, delivery, food service, etc.)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualifications" className="text-white">Qualifications</Label>
                  <Textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="bg-white/5 border-purple-500/30 text-white min-h-[80px]"
                    placeholder="Any relevant skills or qualifications you'd like to highlight"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whyJoin" className="text-white">Why do you want to join Midnight Munchies?</Label>
                  <Textarea
                    id="whyJoin"
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    className="bg-white/5 border-purple-500/30 text-white min-h-[100px]"
                    placeholder="Tell us what interests you about this position and our company"
                  />
                </div>
              </div>

              <Separator className="bg-purple-500/20" />

              <div className="space-y-4">
                <h3 className="text-white text-lg">Resume</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-white">Upload Resume (Optional)</Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="bg-white/5 border-purple-500/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-white hover:file:bg-purple-500/30"
                  />
                  <p className="text-white/50 text-xs">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                  {formData.resumeFile && (
                    <p className="text-cyan-400 text-sm">Selected: {formData.resumeFile.name}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white text-lg py-6"
              >
                Submit Application
              </Button>

              <p className="text-white/50 text-xs text-center">
                By submitting this application, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
