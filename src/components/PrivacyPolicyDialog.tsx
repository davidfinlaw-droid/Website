import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface PrivacyPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-br from-purple-950/95 to-black/95 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">🍴 Privacy Policy</DialogTitle>
          <p className="text-white/60 text-sm">Last updated: November 11, 2025</p>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-white/80">
            <section>
              <h3 className="text-white text-lg mb-2">1. Introduction</h3>
              <p className="text-sm leading-relaxed">
                Welcome to Midnight Munchies ("we," "our," or "us"). We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit or make use of our website and food delivery services, available daily between 8:00 PM and 5:00 AM.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                By using our services, you agree to the terms of this Privacy Policy.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">2. Information We Collect</h3>
              <p className="text-sm leading-relaxed mb-2">We may collect the following information from you:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li><strong>Personal Information:</strong> Name, email, phone number, delivery address, and payment information.</li>
                <li><strong>Account Information:</strong> Username, password, and order history.</li>
                <li><strong>Usage Data:</strong> Device information, IP address, browser type, access times, and pages visited.</li>
                <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience (e.g., remember login, preferences).</li>
              </ul>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">3. How We Use Your Information</h3>
              <p className="text-sm leading-relaxed mb-2">We use your information to:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Process and deliver your food orders.</li>
                <li>Communicate with you regarding your order or account.</li>
                <li>Improve our website, services, and user experience.</li>
                <li>Handle payments securely.</li>
                <li>Comply with legal obligations.</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                We do not sell your personal data to third parties.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">4. Sharing of Information</h3>
              <p className="text-sm leading-relaxed mb-2">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Delivery partners to complete your order.</li>
                <li>Payment processors to handle transactions securely.</li>
                <li>Service providers that help us operate our website (e.g., hosting, analytics).</li>
                <li>Legal authorities if required by law or to protect our rights.</li>
              </ul>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">5. Data Retention</h3>
              <p className="text-sm leading-relaxed">
                We retain personal data only as long as necessary for our business and legal obligations. You may request deletion of your account or data by contacting us at davidfinlaw@hopeworks.org.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">6. Security</h3>
              <p className="text-sm leading-relaxed">
                We implement appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, or misuse.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">7. Your Rights</h3>
              <p className="text-sm leading-relaxed mb-2">Depending on your jurisdiction, you may have rights to:</p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Access and correct your personal data.</li>
                <li>Request deletion or restriction of processing.</li>
                <li>Withdraw consent (where applicable).</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                To exercise your rights, please contact us at davidfinlaw@hopeworks.org.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">8. Cookies</h3>
              <p className="text-sm leading-relaxed">
                We use cookies to improve user experience, personalize content, and analyze traffic. You can disable cookies in your browser settings, but some parts of the site may not function properly.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">9. Changes to This Policy</h3>
              <p className="text-sm leading-relaxed">
                We may update this Privacy Policy periodically. Updates will be posted on this page with a revised "Last updated" date.
              </p>
            </section>

            <Separator className="bg-purple-500/20" />

            <section>
              <h3 className="text-white text-lg mb-2">10. Contact Us</h3>
              <p className="text-sm leading-relaxed mb-2">
                If you have questions about this Privacy Policy or our practices, contact us at:
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
