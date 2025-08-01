import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, LogIn } from 'lucide-react';
import { useToast } from './ui/use-toast';

const LoginPage = () => {
  const [userType, setUserType] = useState('consumer');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-fresh">
      <Card className="w-full max-w-md mx-4 sm:mx-0 animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-organic bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={setUserType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumer">Customer</TabsTrigger>
              <TabsTrigger value="farmer">Farmer</TabsTrigger>
            </TabsList>
            <TabsContent value="consumer">
              <LoginForm userType="consumer" />
            </TabsContent>
            <TabsContent value="farmer">
              <LoginForm userType="farmer" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface LoginFormProps {
  userType: 'consumer' | 'farmer';
}

const LoginForm = ({ userType }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder for web3forms API call
    console.log('Form submitted', { email, password, userType });

    toast({
      title: "Login Successful",
      description: `Welcome back!`,
    });

    if (userType === 'farmer') {
      navigate('/sales-dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full btn-hero">
        <LogIn className="mr-2 h-5 w-5" />
        Login as {userType === 'consumer' ? 'Customer' : 'Farmer'}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Button variant="link" className="p-0 h-auto">
          Sign up <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
