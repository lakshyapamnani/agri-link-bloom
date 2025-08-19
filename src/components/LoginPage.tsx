import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, LogIn } from 'lucide-react';
import { useToast } from './ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder for any future API call
    console.log('Form submitted', { email, password });

    toast({
      title: "Login Successful",
      description: `Welcome back!`,
    });

    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-fresh">
      <Card className="w-full max-w-md mx-4 sm:mx-0 animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-organic bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              Login
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="p-0 h-auto">
                Sign up <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
