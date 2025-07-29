import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import LandingPage from "@/components/LandingPage";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [userType, setUserType] = useState<'farmer' | 'consumer' | null>(null);
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: 'farmer' | 'consumer') => {
    setUserType(type);
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <Navigation userType={userType} onUserTypeChange={setUserType} />
      
      {!userType ? (
        <LandingPage onUserTypeSelect={handleUserTypeSelect} />
      ) : (
        <UserDashboard userType={userType} />
      )}
    </div>
  );
};

export default Index;
