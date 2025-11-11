import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShieldCheck, Package, Clock, CheckCircle2, XCircle, Truck, MapPin, Phone, Mail, Briefcase, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Order {
  id: string;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  expressDelivery: boolean;
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
  paymentMethod: string;
  status: string;
  createdAt: string;
}

interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantInfo: any;
  submittedAt: string;
  status: string;
}

export function AdminOrderViewer() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      loadOrders();
      loadApplications();
    }
  }, [open]);

  const loadOrders = () => {
    try {
      const storedOrders = localStorage.getItem('midnightMunchiesOrders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders.reverse()); // Show newest first
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    }
  };

  const loadApplications = () => {
    try {
      const storedApplications = localStorage.getItem('midnightMunchiesApplications');
      if (storedApplications) {
        const parsedApplications = JSON.parse(storedApplications);
        setApplications(parsedApplications.reverse()); // Show newest first
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('Failed to load applications');
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    try {
      const storedOrders = localStorage.getItem('midnightMunchiesOrders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        const updatedOrders = parsedOrders.map((order: Order) => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        localStorage.setItem('midnightMunchiesOrders', JSON.stringify(updatedOrders));
        loadOrders();
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const clearAllOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders? This cannot be undone.')) {
      localStorage.removeItem('midnightMunchiesOrders');
      setOrders([]);
      toast.success('All orders cleared');
    }
  };

  const updateApplicationStatus = (appId: string, newStatus: string) => {
    try {
      const storedApplications = localStorage.getItem('midnightMunchiesApplications');
      if (storedApplications) {
        const parsedApplications = JSON.parse(storedApplications);
        const updatedApplications = parsedApplications.map((app: JobApplication) => 
          app.id === appId ? { ...app, status: newStatus } : app
        );
        localStorage.setItem('midnightMunchiesApplications', JSON.stringify(updatedApplications));
        loadApplications();
        toast.success(`Application status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'preparing': return 'bg-purple-500';
      case 'on-the-way': return 'bg-cyan-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="size-4" />;
      case 'confirmed': return <CheckCircle2 className="size-4" />;
      case 'preparing': return <Package className="size-4" />;
      case 'on-the-way': return <Truck className="size-4" />;
      case 'delivered': return <CheckCircle2 className="size-4" />;
      case 'cancelled': return <XCircle className="size-4" />;
      default: return <Clock className="size-4" />;
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-6 left-6 bg-purple-900/80 backdrop-blur-md border-purple-500/50 text-white hover:bg-purple-800/80 z-50"
      >
        <ShieldCheck className="mr-2 size-4" />
        Admin Panel
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-gradient-to-br from-purple-950/95 to-black/95 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <ShieldCheck className="size-6 text-purple-400" />
            Admin Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full justify-start bg-purple-900/30 border-purple-500/30 mb-4">
            <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600">
              <Package className="size-4 mr-2" />
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-purple-600">
              <Briefcase className="size-4 mr-2" />
              Applications ({applications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="flex justify-end gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={loadOrders}
                className="border-purple-500/50 text-white hover:bg-purple-500/20"
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllOrders}
                className="border-red-500/50 text-red-300 hover:bg-red-500/20"
              >
                Clear All Orders
              </Button>
            </div>

            <ScrollArea className="h-[60vh] pr-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="size-16 mx-auto mb-4 text-purple-400/40" />
              <p className="text-white/60">No orders yet</p>
              <p className="text-white/40 text-sm mt-2">Orders will appear here when customers place them</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="bg-gradient-to-br from-purple-900/40 to-black/60 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      <span className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.id.split('-')[1]}
                      </span>
                      <div className="flex items-center gap-3">
                        <Badge className={`${getStatusColor(order.status)} text-white border-0`}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-white/60 text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-500/10 rounded-lg">
                      <div>
                        <h4 className="text-white text-sm mb-2">Customer Details</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-white/80">👤 {order.customerInfo.name}</p>
                          <p className="text-white/80 flex items-center gap-2">
                            <Phone className="size-3" />
                            {order.customerInfo.phone}
                          </p>
                          {order.customerInfo.email && (
                            <p className="text-white/80 flex items-center gap-2">
                              <Mail className="size-3" />
                              {order.customerInfo.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white text-sm mb-2">Delivery Address</h4>
                        <p className="text-white/80 text-sm flex items-start gap-2">
                          <MapPin className="size-3 mt-1 shrink-0" />
                          {order.customerInfo.address}
                        </p>
                        {order.expressDelivery && (
                          <Badge className="mt-2 bg-cyan-500 text-white border-0">
                            ⚡ Express Delivery
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="text-white mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start p-2 bg-purple-500/5 rounded">
                            <div className="flex-1">
                              <p className="text-white">{item.quantity}x {item.menuItem.name}</p>
                              {Object.keys(item.customizations).length > 0 && (
                                <p className="text-white/50 text-xs mt-1">
                                  Customizations: {Object.values(item.customizations).flat().join(', ')}
                                </p>
                              )}
                            </div>
                            <span className="text-cyan-400 ml-2">
                              ${(item.totalPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-purple-500/20" />

                    {/* Order Summary */}
                    <div className="flex items-end justify-between">
                      <div className="space-y-1 text-sm">
                        <p className="text-white/60">Subtotal: ${order.subtotal.toFixed(2)}</p>
                        <p className="text-white/60">Delivery: ${order.deliveryFee.toFixed(2)}</p>
                        {order.expressDelivery && (
                          <p className="text-cyan-400">Express: +$2.00</p>
                        )}
                        <p className="text-white">Total: ${order.total.toFixed(2)}</p>
                        <p className="text-white/60 text-xs">Payment: {order.paymentMethod}</p>
                      </div>

                      {/* Status Update */}
                      <div className="flex flex-col gap-2">
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-[180px] bg-purple-500/20 border-purple-500/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="preparing">Preparing</SelectItem>
                            <SelectItem value="on-the-way">On the Way</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
          </TabsContent>

          <TabsContent value="applications">
            <ScrollArea className="h-[60vh] pr-4">
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="size-16 mx-auto mb-4 text-purple-400/40" />
                  <p className="text-white/60">No job applications yet</p>
                  <p className="text-white/40 text-sm mt-2">Applications will appear here when candidates apply</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="bg-gradient-to-br from-purple-900/40 to-black/60 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-white">
                          <span className="flex items-center gap-2">
                            <Briefcase className="size-5" />
                            {app.applicantInfo.fullName}
                          </span>
                          <Badge className="bg-cyan-500 text-white border-0">
                            {app.jobTitle}
                          </Badge>
                        </CardTitle>
                        <p className="text-white/60 text-sm flex items-center gap-2">
                          <Calendar className="size-4" />
                          Applied: {new Date(app.submittedAt).toLocaleString()}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-500/10 rounded-lg">
                          <div className="space-y-2 text-sm">
                            <p className="text-white/80 flex items-center gap-2">
                              <Mail className="size-3" />
                              {app.applicantInfo.email}
                            </p>
                            <p className="text-white/80 flex items-center gap-2">
                              <Phone className="size-3" />
                              {app.applicantInfo.phone}
                            </p>
                            <p className="text-white/80">Age: {app.applicantInfo.age}</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            {app.applicantInfo.address && (
                              <p className="text-white/80 flex items-start gap-2">
                                <MapPin className="size-3 mt-1 shrink-0" />
                                {app.applicantInfo.address}
                              </p>
                            )}
                            {app.applicantInfo.driversLicense && (
                              <p className="text-white/80">DL: {app.applicantInfo.driversLicense}</p>
                            )}
                          </div>
                        </div>

                        {/* Application Details */}
                        {app.applicantInfo.availability && (
                          <div>
                            <h4 className="text-white text-sm mb-1">Availability:</h4>
                            <p className="text-white/70 text-sm">{app.applicantInfo.availability}</p>
                          </div>
                        )}

                        {app.applicantInfo.experience && (
                          <div>
                            <h4 className="text-white text-sm mb-1">Experience:</h4>
                            <p className="text-white/70 text-sm">{app.applicantInfo.experience}</p>
                          </div>
                        )}

                        {app.applicantInfo.whyJoin && (
                          <div>
                            <h4 className="text-white text-sm mb-1">Why Join:</h4>
                            <p className="text-white/70 text-sm">{app.applicantInfo.whyJoin}</p>
                          </div>
                        )}

                        {app.applicantInfo.resumeFile && (
                          <div className="p-3 bg-cyan-500/10 rounded-lg">
                            <p className="text-cyan-400 text-sm">📄 Resume attached: {app.applicantInfo.resumeFile.name}</p>
                          </div>
                        )}

                        <Separator className="bg-purple-500/20" />

                        {/* Status Update */}
                        <div className="flex items-center justify-between">
                          <Badge className={app.status === 'pending' ? 'bg-yellow-500' : app.status === 'reviewing' ? 'bg-blue-500' : app.status === 'accepted' ? 'bg-green-500' : 'bg-red-500'}>
                            {app.status.toUpperCase()}
                          </Badge>
                          <Select
                            value={app.status}
                            onValueChange={(value) => updateApplicationStatus(app.id, value)}
                          >
                            <SelectTrigger className="w-[180px] bg-purple-500/20 border-purple-500/30 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="reviewing">Reviewing</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="accepted">Accepted</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t border-purple-500/20">
          <p className="text-white/60 text-sm">
            💡 <strong>Demo Mode:</strong> Data is stored in browser localStorage. 
            For production, connect to Supabase for real-time management.
          </p>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
