import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf } from "lucide-react";

export function About() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <Leaf className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl font-bold mt-4">About Agri-Link</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Connecting communities with fresh, local produce.
        </p>
      </div>
      <div className="mt-12 max-w-3xl mx-auto">
        <p className="text-lg mb-6">
          Agri-Link was born from a simple idea: to bridge the gap between
          farmers and consumers. We believe that everyone should have access to
          fresh, healthy food, and that farmers should be rewarded fairly for
          their hard work.
        </p>
        <p className="text-lg">
          Our platform empowers local farmers by providing them with a direct
          channel to sell their produce to a wider audience. For consumers, we
          offer a convenient way to buy the freshest, most nutritious food
          available, all while supporting the local economy.
        </p>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold">Our Team</h2>
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="Team Member" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="mt-2 font-semibold">Jane Doe</p>
            <p className="text-sm text-muted-foreground">Founder & CEO</p>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="Team Member" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <p className="mt-2 font-semibold">John Smith</p>
            <p className="text-sm text-muted-foreground">Head of Operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
