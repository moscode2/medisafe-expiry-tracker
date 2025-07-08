import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Keyboard, Scan, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (barcode: string, medicineName: string, expiryDate: string) => void;
}

const ScannerModal = ({ isOpen, onClose, onScan }: ScannerModalProps) => {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera');
  const [barcode, setBarcode] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate barcode detection
    setTimeout(() => {
      const mockBarcode = '1234567890123';
      setBarcode(mockBarcode);
      setIsScanning(false);
      toast({
        title: "Barcode detected!",
        description: `Found barcode: ${mockBarcode}`,
      });
    }, 2000);
  };

  const handleSubmit = () => {
    if (!barcode || !medicineName || !expiryDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onScan(barcode, medicineName, expiryDate);
    setBarcode('');
    setMedicineName('');
    setExpiryDate('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5 text-primary" />
            Add New Medicine
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Scan Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={scanMode === 'camera' ? 'medical' : 'outline'}
              size="sm"
              onClick={() => setScanMode('camera')}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Camera Scan
            </Button>
            <Button
              variant={scanMode === 'manual' ? 'medical' : 'outline'}
              size="sm"
              onClick={() => setScanMode('manual')}
              className="flex-1"
            >
              <Keyboard className="h-4 w-4 mr-2" />
              Manual Entry
            </Button>
          </div>

          {/* Camera Scan Mode */}
          {scanMode === 'camera' && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-8 text-center">
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="animate-pulse-glow mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                      <Scan className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Scanning for barcode...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-sm text-muted-foreground">Position the barcode in front of your camera</p>
                      <Button
                        variant="scanner"
                        onClick={handleStartScan}
                        className="mt-3"
                      >
                        Start Scanning
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Enter or scan barcode"
                readOnly={scanMode === 'camera'}
              />
            </div>

            <div>
              <Label htmlFor="medicine-name">Medicine Name</Label>
              <Input
                id="medicine-name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder="e.g., Aspirin 500mg"
              />
            </div>

            <div>
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input
                id="expiry-date"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button variant="medical" onClick={handleSubmit} className="flex-1">
              Add Medicine
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScannerModal;