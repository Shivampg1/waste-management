import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, BarChart3, Bell, Settings, LogOut } from "lucide-react";
import logo from "@/assets/medwaste-logo.png";

interface NavigationProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
  alertCount?: number;
}

export const Navigation = ({ isLoggedIn = false, onLogout, alertCount = 0 }: NavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img src={logo} alt="MedWaste Guard" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-primary">MedWaste Guard</h1>
              <p className="text-xs text-muted-foreground">Medical Waste Management</p>
            </div>
          </Link>

          {isLoggedIn && (
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/">
                <Button 
                  variant={isActive("/") ? "default" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/stats">
                <Button 
                  variant={isActive("/stats") ? "default" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Stats
                </Button>
              </Link>
              <Link to="/alerts">
                <Button 
                  variant={isActive("/alerts") ? "default" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Alerts
                  {alertCount > 0 && (
                    <Badge variant="destructive" className="ml-1 h-5 min-w-5 px-1">
                      {alertCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/settings">
                <Button 
                  variant={isActive("/settings") ? "default" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex flex-col items-end">
                <p className="text-sm font-medium">Hospital Staff</p>
                <p className="text-xs text-muted-foreground">hospitalityservice001@gmail.com</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Hospital Staff? Log In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
