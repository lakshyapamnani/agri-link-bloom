import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

import { useEffect, useState } from "react";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState({ username: "Guest", email: "" });

  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser({ ...user, ...parsed });
        } else {
          setUser({ username: "Guest", email: "" });
        }
      } catch {
        setUser({ username: "Guest", email: "" });
      }
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
    // eslint-disable-next-line
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="username">Username</Label>
          <span id="username" className="text-muted-foreground">
            {user.username || "Guest"}
          </span>
        </div>
        {user.email && (
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email</Label>
            <span id="email" className="text-muted-foreground">
              {user.email}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Label htmlFor="theme-switcher">Theme</Label>
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <Switch
              id="theme-switcher"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <Moon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
