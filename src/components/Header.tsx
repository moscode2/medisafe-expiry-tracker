import { Button } from "@/components/ui/button";
import { Bell, Menu, CheckSquare } from "lucide-react";
import UserMenu from "@/components/UserMenu";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-card-medical">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-medical">
              <CheckSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TaskMaster AI</h1>
              <p className="text-xs text-muted-foreground">Intelligent Task Management</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <UserMenu />

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
export default Header;