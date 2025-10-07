import { Navigation } from "@/components/Navigation";
import { DustbinCard } from "@/components/DustbinCard";
import { CameraDashboard } from "@/components/CameraDashboard";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Activity, TrendingUp, AlertTriangle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [dustbins, setDustbins] = useState([
    { id: 1, name: "Bin 1", distance: 45, fillPercentage: 55, location: "Ward A - Room 101" },
    { id: 2, name: "Bin 2", distance: 62, fillPercentage: 38, location: "Ward B - Room 205" },
    { id: 3, name: "Bin 3", distance: 8, fillPercentage: 92, location: "Emergency - Hall 1" },
    { id: 4, name: "Bin 4", distance: 71, fillPercentage: 29, location: "ICU - Room 302" },
    { id: 5, name: "Bin 5", distance: 12, fillPercentage: 88, location: "Surgery - Room 401" },
    { id: 6, name: "Bin 6", distance: 53, fillPercentage: 47, location: "Pediatrics - Room 110" },
  ]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      navigate("/login");
    }

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setDustbins(prev => prev.map(bin => ({
        ...bin,
        distance: Math.max(5, Math.min(95, bin.distance + (Math.random() - 0.5) * 10)),
        fillPercentage: Math.max(0, Math.min(100, bin.fillPercentage + (Math.random() - 0.3) * 5)),
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleScheduleEmpty = (binId: number) => {
    const bin = dustbins.find(b => b.id === binId);
    toast.success("Emptying scheduled", {
      description: `Email sent to staff: ${bin?.name} needs to be emptied by 15:00. Location: ${bin?.location}`,
    });
  };

  if (!isLoggedIn) return null;

  const fullBins = dustbins.filter(bin => bin.fillPercentage >= 80).length;
  const totalWaste = dustbins.reduce((acc, bin) => acc + bin.fillPercentage, 0) / dustbins.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} alertCount={fullBins} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">Dashboard Overview</h1>
          <p className="text-muted-foreground text-lg">Real-time medical waste monitoring and management system</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Active Bins</p>
                <p className="text-3xl font-bold text-primary">{dustbins.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/20">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Full Bins</p>
                <p className="text-3xl font-bold text-destructive">{fullBins}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-secondary/20">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Avg Fill Level</p>
                <p className="text-3xl font-bold text-secondary">{totalWaste.toFixed(0)}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dustbins Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              Dustbin Status
              {fullBins > 0 && (
                <span className="px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-sm font-semibold">
                  {fullBins} Require Attention
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dustbins.map((bin) => (
                <DustbinCard
                  key={bin.id}
                  {...bin}
                  onScheduleEmpty={handleScheduleEmpty}
                />
              ))}
            </div>
          </div>

          {/* Camera Dashboard - Takes 1 column */}
          <div className="lg:col-span-1">
            <CameraDashboard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
