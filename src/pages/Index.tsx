import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import LandingPage from "@/components/LandingPage";
import UserDashboard from "@/components/UserDashboard";

const Index = () => {
  const [userType, setUserType] = useState<'farmer' | 'consumer' | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('agrilink_user');
      if (raw) {
        const parsed = JSON.parse(raw) as { role?: 'farmer' | 'consumer' };
        if (parsed?.role === 'farmer' || parsed?.role === 'consumer') {
          setUserType(parsed.role);
        }
      }
    } catch {}
  }, []);
  const handleUserTypeSelect = (type: 'farmer' | 'consumer') => {
    setUserType(type);
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
