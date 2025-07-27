import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Leaf, User, ShoppingCart, MessageCircle, BarChart3 } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { Cart } from "./Cart";

interface NavigationProps {
  userType: 'farmer' | 'consumer' | null;
  onUserTypeChange: (type: 'farmer' | 'consumer' | null) => void;
}

const Navigation = ({ userType, onUserTypeChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useProductStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-md bg-card/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onUserTypeChange(null)}>
            <div className="bg-gradient-organic p-2 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Agri-Link</span>
            <Badge className="badge-organic text-xs">Fresh</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!userType ? (
              <>
                <Link to="/how-it-works">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    How it Works
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    About
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => onUserTypeChange('farmer')}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  I'm a Farmer
                </Button>
                <Button
                  className="btn-hero"
                  onClick={() => onUserTypeChange('consumer')}
                >
                  Shop Fresh
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <span>Home</span>
                </Button>
                {userType === 'farmer' ? (
                  <>
                    <Link to="/sales-dashboard">
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Sales Dashboard</span>
                      </Button>
                    </Link>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>AI Assistant</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Cart />
                    <Link to="/settings">
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Settings</span>
                      </Button>
                    </Link>
                  </>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => onUserTypeChange(null)}
                  className="text-muted-foreground"
                >
                  Switch User
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {!userType ? (
                <>
                  <Link to="/how-it-works">
                    <Button variant="ghost" className="justify-start text-muted-foreground">
                      How it Works
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="ghost" className="justify-start text-muted-foreground">
                      About
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      onUserTypeChange('farmer');
                      setIsMenuOpen(false);
                    }}
                    className="justify-start border-primary text-primary"
                  >
                    I'm a Farmer
                  </Button>
                  <Button 
                    className="btn-hero justify-start"
                    onClick={() => {
                      onUserTypeChange('consumer');
                      setIsMenuOpen(false);
                    }}
                  >
                    Shop Fresh
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start">
                    Home
                  </Button>
                  {userType === 'farmer' ? (
                    <>
                      <Link to="/sales-dashboard">
                        <Button variant="ghost" className="justify-start">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Sales Dashboard
                        </Button>
                      </Link>
                      <Button variant="ghost" className="justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        AI Assistant
                      </Button>
                    </>
                  ) : (
                    <>
                      <Cart />
                      <Link to="/settings">
                        <Button variant="ghost" className="justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                    </>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      onUserTypeChange(null);
                      setIsMenuOpen(false);
                    }}
                    className="justify-start text-muted-foreground"
                  >
                    Switch User
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;