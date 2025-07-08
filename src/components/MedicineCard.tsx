import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit3, Trash2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";

interface MedicineCardProps {
  id: string;
  name: string;
  barcode: string;
  expiryDate: string;
  dateAdded: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const MedicineCard = ({ 
  id, 
  name, 
  barcode, 
  expiryDate, 
  dateAdded, 
  onEdit, 
  onDelete 
}: MedicineCardProps) => {
  const expiry = parseISO(expiryDate);
  const today = new Date();
  const daysUntilExpiry = differenceInDays(expiry, today);
  
  // Determine status and styling
  const getStatus = () => {
    if (daysUntilExpiry < 0) {
      return {
        status: 'expired',
        variant: 'expired' as const,
        icon: XCircle,
        text: 'Expired',
        textColor: 'text-destructive',
        bgColor: 'bg-destructive-light',
        borderColor: 'border-destructive/20'
      };
    } else if (daysUntilExpiry <= 7) {
      return {
        status: 'expiring',
        variant: 'expiring' as const,
        icon: AlertTriangle,
        text: daysUntilExpiry <= 0 ? 'Expires today' : `${daysUntilExpiry} days left`,
        textColor: 'text-warning',
        bgColor: 'bg-warning-light',
        borderColor: 'border-warning/20'
      };
    } else {
      return {
        status: 'safe',
        variant: 'safe' as const,
        icon: CheckCircle,
        text: `${daysUntilExpiry} days left`,
        textColor: 'text-success',
        bgColor: 'bg-success-light',
        borderColor: 'border-success/20'
      };
    }
  };

  const statusInfo = getStatus();
  const StatusIcon = statusInfo.icon;

  return (
    <Card className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 hover:shadow-card-medical transition-medical`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">Barcode: {barcode}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-background/50"
              onClick={() => onEdit?.(id)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDelete?.(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.textColor} bg-background/50`}>
            <StatusIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{statusInfo.text}</span>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <div>
                <p className="text-xs">Expires</p>
                <p className="font-medium text-foreground">{format(expiry, 'MMM dd, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <div>
                <p className="text-xs">Added</p>
                <p className="font-medium text-foreground">{format(parseISO(dateAdded), 'MMM dd, yyyy')}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;