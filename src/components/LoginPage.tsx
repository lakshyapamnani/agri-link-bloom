import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const [userType, setUserType] = useState('customer');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === 'farmer') {
      navigate('/farmer');
    } else {
      navigate('/customer');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-fresh">
      <Card className="w-full max-w-md mx-4 sm:mx-0 animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-organic bg-clip-text text-transparent">
            Welcome
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user-type">I am a</Label>
              <Select onValueChange={setUserType} defaultValue={userType}>
                <SelectTrigger id="user-type">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="farmer">Farmer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleLogin} className="w-full btn-hero">
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
