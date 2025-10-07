import { Navigation } from "@/components/Navigation";
import { WasteMetrics } from "@/components/WasteMetrics";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Stats = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} alertCount={2} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Hospital Waste Statistics</h1>
          <p className="text-muted-foreground">Comprehensive waste management analytics and insights</p>
        </div>

        <WasteMetrics />
      </main>
    </div>
  );
};

export default Stats;
