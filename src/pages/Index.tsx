import { useState } from "react";
import Navigation from "@/components/Navigation";
import LandingPage from "@/components/LandingPage";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [userType, setUserType] = useState<'farmer' | 'consumer' | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation userType={userType} onUserTypeChange={setUserType} />
      
      {!userType ? (
        <LandingPage onUserTypeSelect={setUserType} />
      ) : (
        <UserDashboard userType={userType} />
      )}
    </div>
  );
};

export default Index;
