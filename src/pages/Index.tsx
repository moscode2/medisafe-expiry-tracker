import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import DashboardStats from "@/components/DashboardStats";
import MedicineCard from "@/components/MedicineCard";
import ScannerModal from "@/components/ScannerModal";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockMedicines = [
  {
    id: '1',
    name: 'Aspirin 500mg',
    barcode: '1234567890123',
    expiryDate: '2024-08-15',
    dateAdded: '2024-07-01'
  },
  {
    id: '2',
    name: 'Vitamin D3',
    barcode: '2345678901234',
    expiryDate: '2025-12-20',
    dateAdded: '2024-06-15'
  },
  {
    id: '3',
    name: 'Blood Pressure Medication',
    barcode: '3456789012345',
    expiryDate: '2024-07-20',
    dateAdded: '2024-05-10'
  },
  {
    id: '4',
    name: 'Ibuprofen 400mg',
    barcode: '4567890123456',
    expiryDate: '2024-07-05',
    dateAdded: '2024-04-20'
  }
];

const Index = () => {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { toast } = useToast();

  // Filter medicines based on search
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.barcode.includes(searchTerm)
  );

  // Calculate stats
  const calculateStats = () => {
    const today = new Date();
    let safe = 0, expiring = 0, expired = 0;

    medicines.forEach(medicine => {
      const expiry = new Date(medicine.expiryDate);
      const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry < 0) expired++;
      else if (daysUntilExpiry <= 7) expiring++;
      else safe++;
    });

    return { safe, expiring, expired };
  };

  const stats = calculateStats();

  const handleAddMedicine = (barcode: string, medicineName: string, expiryDate: string) => {
    const newMedicine = {
      id: Date.now().toString(),
      name: medicineName,
      barcode,
      expiryDate,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setMedicines([...medicines, newMedicine]);
    toast({
      title: "Medicine added successfully!",
      description: `${medicineName} has been added to your tracker.`,
    });
  };

  const handleEditMedicine = (id: string) => {
    toast({
      title: "Edit functionality",
      description: "Connect to Supabase to enable editing medicines.",
    });
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
    toast({
      title: "Medicine removed",
      description: "Medicine has been removed from your tracker.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Welcome to Mediscann</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your medication expiry dates with ease. Scan barcodes, get notifications, and never let your medicines expire again.
          </p>
        </div>

        {/* Stats Dashboard */}
        <DashboardStats
          totalMedicines={medicines.length}
          safeMedicines={stats.safe}
          expiringMedicines={stats.expiring}
          expiredMedicines={stats.expired}
        />

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="medical"
            size="lg"
            onClick={() => setIsScannerOpen(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Medicine
          </Button>
        </div>

        {/* Medicines Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            Your Medicines ({filteredMedicines.length})
          </h3>
          
          {filteredMedicines.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {searchTerm ? 'No medicines found matching your search.' : 'No medicines added yet. Start by scanning your first medicine!'}
              </p>
              {!searchTerm && (
                <Button
                  variant="medical"
                  onClick={() => setIsScannerOpen(true)}
                  className="mt-4"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Medicine
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedicines.map((medicine) => (
                <MedicineCard
                  key={medicine.id}
                  {...medicine}
                  onEdit={handleEditMedicine}
                  onDelete={handleDeleteMedicine}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Card for Backend Features */}
        <div className="bg-accent/50 border border-accent rounded-lg p-6 text-center">
          <h4 className="font-semibold text-foreground mb-2">Ready to unlock full functionality?</h4>
          <p className="text-muted-foreground mb-4">
            Connect to Supabase to enable user authentication, cloud storage, and real-time notifications for your medicines.
          </p>
          <Button variant="outline">
            Connect to Supabase
          </Button>
        </div>
      </main>

      {/* Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleAddMedicine}
      />
    </div>
  );
};

export default Index;
