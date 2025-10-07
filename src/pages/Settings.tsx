import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Mail, Camera, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [cameraRecording, setCameraRecording] = useState(true);

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

  const handleSaveSettings = () => {
    toast.success("Settings saved", {
      description: "Your preferences have been updated successfully.",
    });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} alertCount={2} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure your MedWaste Guard preferences</p>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label htmlFor="email-alerts" className="text-base font-medium">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts via email when bins are full</p>
                </div>
                <Switch 
                  id="email-alerts" 
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label htmlFor="push-notifications" className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get instant notifications in the dashboard</p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>
          </Card>

          {/* Automation Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Automation</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label htmlFor="auto-schedule" className="text-base font-medium">Auto-Schedule Emptying</Label>
                  <p className="text-sm text-muted-foreground">Automatically schedule bin emptying when full</p>
                </div>
                <Switch 
                  id="auto-schedule" 
                  checked={autoSchedule}
                  onCheckedChange={setAutoSchedule}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sanitization-interval">Sanitization Interval (hours)</Label>
                <Input 
                  id="sanitization-interval" 
                  type="number" 
                  defaultValue="2" 
                  min="1" 
                  max="24"
                  className="max-w-xs"
                />
              </div>
            </div>
          </Card>

          {/* Camera Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Camera System</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label htmlFor="camera-recording" className="text-base font-medium">24/7 Recording</Label>
                  <p className="text-sm text-muted-foreground">Continuous camera feed recording</p>
                </div>
                <Switch 
                  id="camera-recording" 
                  checked={cameraRecording}
                  onCheckedChange={setCameraRecording}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="camera-quality">Video Quality</Label>
                <select 
                  id="camera-quality" 
                  className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="720p">720p HD</option>
                  <option value="1080p">1080p Full HD</option>
                  <option value="4k">4K Ultra HD</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Dustbin Management */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Dustbin Configuration</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bin-capacity">Default Bin Capacity (Liters)</Label>
                <Input 
                  id="bin-capacity" 
                  type="number" 
                  defaultValue="100" 
                  min="50" 
                  max="500"
                  className="max-w-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-threshold">Full Alert Threshold (%)</Label>
                <Input 
                  id="full-threshold" 
                  type="number" 
                  defaultValue="80" 
                  min="50" 
                  max="100"
                  className="max-w-xs"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveSettings} className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
