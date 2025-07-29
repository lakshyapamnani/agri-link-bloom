import Profile from "./Profile";
import Navigation from "./Navigation";

export const Settings = () => (
  <>
  <Navigation userType={null} onUserTypeChange={() => {}} />
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">Settings</h1>
    <div className="max-w-2xl mx-auto">
      <Profile />
    </div>
  </div>
  </>
);
