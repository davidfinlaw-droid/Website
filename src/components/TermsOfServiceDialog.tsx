import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsOfServiceDialog({ open, onOpenChange }: TermsOfServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-br from-purple-950/95 to-black/95 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">📜 Terms of Service</DialogTitle>
          <p className="text-white/60 text-sm">Last updated: November 11, 2025</p>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-white/80">
            <section>
              <h3 className="text-white text-lg mb-2">1. Overview</h3>
              <p className="text-sm leading-relaxed">
                Welcome to Midnight Munchies! By accessing or using our website and services (available from 8:00 PM to 5:00 AM daily), you agree to these Terms of Service. Please read them carefully.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">2. Eligibility</h3>
              <p className="text-sm leading-relaxed">
                You must be at least 18 years old (or the age of majority in your region) to place orders. By using our website, you confirm that you meet this requirement.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">3. Services</h3>
              <p className="text-sm leading-relaxed">
                Midnight Munchies provides online ordering and delivery of food during operating hours. Availability may vary depending on your location and restaurant hours.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">4. Orders and Payments</h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>All orders must be placed through our website or mobile app.</li>
                <li>Prices are listed in USD and include applicable taxes and delivery fees.</li>
                <li>Payment is processed securely through third-party payment gateways.</li>
                <li>Once an order is confirmed, it cannot be canceled or refunded unless there's an error or issue caused by us.</li>
              </ul>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">5. Delivery Policy</h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Delivery times are estimates and may vary due to traffic, weather, or restaurant delays.</li>
                <li>You are responsible for providing an accurate delivery address and being available to receive your order.</li>
                <li>If we cannot complete a delivery due to incorrect details or no response, the order may be forfeited without refund.</li>
              </ul>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">6. User Responsibilities</h3>
              <p className="text-sm leading-relaxed mb-2">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Misuse the website or interfere with its operation.</li>
                <li>Provide false or misleading information.</li>
                <li>Attempt to access other users' data or our systems without authorization.</li>
              </ul>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">7. Account</h3>
              <p className="text-sm leading-relaxed">
                If you create an account, you're responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">8. Limitation of Liability</h3>
              <p className="text-sm leading-relaxed mb-2">
                We strive to provide accurate information and reliable service, but we are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Food quality, safety, or preparation (handled by the restaurants).</li>
                <li>Delays, missed deliveries, or technical issues beyond our control.</li>
                <li>Indirect, incidental, or consequential damages arising from your use of the service.</li>
              </ul>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">9. Intellectual Property</h3>
              <p className="text-sm leading-relaxed">
                All content, trademarks, and materials on our website are owned or licensed by Midnight Munchies and may not be used without permission.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">10. Termination</h3>
              <p className="text-sm leading-relaxed">
                We reserve the right to suspend or terminate your account or access if you violate these Terms or engage in fraudulent or abusive behavior.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">11. Governing Law</h3>
              <p className="text-sm leading-relaxed">
                These Terms are governed by the laws of Pennsylvania, United States, without regard to its conflict of law principles.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">12. Contact</h3>
              <p className="text-sm leading-relaxed mb-2">
                For any inquiries about these Terms, please contact us:
              </p>
              <div className="text-sm space-y-1 ml-4">
                <p>📧 davidfinlaw@hopeworks.org</p>
                <p>🏢 632 N 2nd St, Philadelphia, PA 19123</p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
