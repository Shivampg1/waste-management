import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Camera, Video, History, Settings, Clock } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SanitizationLog {
  id: number;
  timestamp: string;
  status: string;
  percentage: number;
}

export const CameraDashboard = () => {
  const [activeView, setActiveView] = useState<"feed" | "logs" | "settings">("feed");
  const [cameraOn, setCameraOn] = useState(true);

  const sanitizationLogs: SanitizationLog[] = [
    { id: 1, timestamp: "14:30", status: "Disinfection Complete", percentage: 100 },
    { id: 2, timestamp: "12:15", status: "Sanitization in Progress", percentage: 90 },
    { id: 3, timestamp: "10:00", status: "UV Treatment Done", percentage: 100 },
    { id: 4, timestamp: "08:45", status: "Area Cleaned", percentage: 95 },
  ];

  const handleCameraToggle = () => {
    setCameraOn(!cameraOn);
    toast.success(cameraOn ? "Camera turned off" : "Camera turned on", {
      description: cameraOn 
        ? "Live feed has been stopped" 
        : "Live feed is now active",
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">AI Sanitization Monitor</h2>
              <p className="text-sm opacity-90">Real-time surveillance & automation</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={cameraOn ? "destructive" : "default"} 
              size="sm" 
              onClick={handleCameraToggle}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                   onClick={() => window.open("https://sanit-tract-backend.vercel.app/", "_blank")}>
                    <Video className="h-4 w-4 mr-2" />
                    Live Feed
                    </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setActiveView("logs")}>
                  <History className="h-4 w-4 mr-2" />
                  Sanitization Logs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveView("settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeView === "feed" && (
          <div className="space-y-4">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Video className={`h-16 w-16 mx-auto ${cameraOn ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="text-sm text-muted-foreground">
                    {cameraOn ? "Live Camera Feed" : "Camera Offline"}
                  </p>
                  {cameraOn ? (
                    <Badge className="bg-destructive">● LIVE</Badge>
                  ) : (
                    <Badge variant="secondary">● OFFLINE</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Camera Status</p>
                <p className={`font-semibold ${cameraOn ? "text-success" : "text-muted-foreground"}`}>
                  {cameraOn ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">AI Detection</p>
                <p className={`font-semibold ${cameraOn ? "text-secondary" : "text-muted-foreground"}`}>
                  {cameraOn ? "Enabled" : "Disabled"}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Recording</p>
                <p className="font-semibold text-accent">24/7</p>
              </div>
            </div>
          </div>
        )}

        {activeView === "logs" && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground mb-4">Recent Sanitization Events</h3>
            {sanitizationLogs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{log.status}</p>
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                  </div>
                </div>
                <Badge variant={log.percentage === 100 ? "default" : "secondary"}>
                  {log.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        )}

        {activeView === "settings" && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Sanitization Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <span className="text-sm">Email Alerts</span>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <span className="text-sm">Auto-Schedule</span>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <span className="text-sm">AI Detection</span>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <span className="text-sm">Sanitization Interval</span>
                <Badge variant="secondary">Every 2 hours</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
