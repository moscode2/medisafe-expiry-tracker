import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Package, XCircle } from "lucide-react";

interface DashboardStatsProps {
  totalMedicines: number;
  safeMedicines: number;
  expiringMedicines: number;
  expiredMedicines: number;
}

const DashboardStats = ({ 
  totalMedicines, 
  safeMedicines, 
  expiringMedicines, 
  expiredMedicines 
}: DashboardStatsProps) => {
  const stats = [
    {
      title: "Total Medicines",
      value: totalMedicines,
      icon: Package,
      gradient: "bg-gradient-primary",
      textColor: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Safe",
      value: safeMedicines,
      icon: CheckCircle,
      gradient: "bg-gradient-success",
      textColor: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Expiring Soon",
      value: expiringMedicines,
      icon: AlertTriangle,
      gradient: "bg-gradient-warning",
      textColor: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Expired",
      value: expiredMedicines,
      icon: XCircle,
      gradient: "bg-gradient-danger",
      textColor: "text-destructive",
      bgColor: "bg-destructive/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-card-medical transition-medical">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className={`h-1 w-full ${stat.gradient} rounded-full mt-2 opacity-20`}></div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;