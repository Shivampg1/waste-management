import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/medwaste-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("hospitalityservice001@gmail.com");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "hospitalityservice001@gmail.com") {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Successfully logged in!", {
        description: "Welcome to MedWaste Guard Dashboard",
      });
      navigate("/");
    } else {
      toast.error("Invalid credentials", {
        description: "Please use the hospital staff email",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="MedWaste Guard" className="h-20 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">MedWaste Guard</h1>
          <p className="text-muted-foreground">Hospital Staff Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="h-11"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            <ShieldCheck className="h-5 w-5 mr-2" />
            Sign In
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>For hospital staff only</p>
            <p className="text-xs mt-1">Contact IT support for access</p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
