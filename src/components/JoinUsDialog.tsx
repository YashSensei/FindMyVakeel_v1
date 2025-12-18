import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Rocket, Scale } from "lucide-react";

interface JoinUsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TALLY_FORM_URL = "https://tally.so/r/LZD6Zy";

const JoinUsDialog = ({ open, onOpenChange }: JoinUsDialogProps) => {
  const handleOpenForm = () => {
    window.open(TALLY_FORM_URL, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join Our Network</DialogTitle>
          <DialogDescription>
            Connect with legal experts or grow your practice. Choose your path below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="border-2 border-primary/20 rounded-lg p-4 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">For Startups</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Get instant access to legal experts who understand your growth journey.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• Company formation & compliance</li>
                <li>• Fundraising documentation</li>
                <li>• IP protection & contracts</li>
              </ul>
            </div>

            <div className="border-2 border-accent/20 rounded-lg p-4 bg-gradient-to-br from-accent/5 to-transparent hover:border-accent/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">For Legal Advisors</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Join our network and connect with ambitious startups seeking expert guidance.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• Access to vetted clients</li>
                <li>• Flexible engagement models</li>
                <li>• Professional growth</li>
              </ul>
            </div>
          </div>

          <Button 
            onClick={handleOpenForm}
            className="w-full bg-gradient-brand hover:opacity-90" 
            size="lg"
          >
            Continue to Application
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            You'll be redirected to our secure application form
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinUsDialog;
