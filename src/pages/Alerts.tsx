import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, XCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Alert {
  id: number;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

const Alerts = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "critical",
      title: "Bin 3 Full",
      message: "Dustbin 3 has reached maximum capacity and requires immediate attention.",
      timestamp: "5 minutes ago",
      resolved: false,
    },
    {
      id: 2,
      type: "critical",
      title: "Bin 5 Full",
      message: "Dustbin 5 is at 95% capacity and will be full soon.",
      timestamp: "15 minutes ago",
      resolved: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Sanitization Overdue",
      message: "Area B sanitization is overdue by 30 minutes.",
      timestamp: "1 hour ago",
      resolved: false,
    },
    {
      id: 4,
      type: "info",
      title: "Scheduled Maintenance",
      message: "Camera system maintenance scheduled for tomorrow at 08:00 AM.",
      timestamp: "2 hours ago",
      resolved: true,
    },
  ]);

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

  const handleResolve = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
    toast.success("Alert resolved", {
      description: "The alert has been marked as resolved.",
    });
  };

  const handleSendEmail = (alert: Alert) => {
    toast.success("Email sent", {
      description: `Notification email sent to staff about: ${alert.title}`,
    });
  };

  if (!isLoggedIn) return null;

  const activeAlerts = alerts.filter(a => !a.resolved);

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} alertCount={activeAlerts.length} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">System Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage critical notifications</p>
        </div>

        <div className="grid gap-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`p-6 ${alert.resolved ? "opacity-60" : ""}`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  alert.type === "critical" ? "bg-destructive/10" :
                  alert.type === "warning" ? "bg-accent/10" :
                  "bg-secondary/10"
                }`}>
                  {alert.type === "critical" ? (
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle className="h-6 w-6 text-accent" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-secondary" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {alert.title}
                        {alert.resolved && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                      </h3>
                      <Badge 
                        variant={
                          alert.type === "critical" ? "destructive" :
                          alert.type === "warning" ? "secondary" :
                          "default"
                        }
                        className="mt-1"
                      >
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {alert.timestamp}
                    </div>

                    {!alert.resolved && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendEmail(alert)}
                          className="gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          Email Staff
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark Resolved
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Alerts;
