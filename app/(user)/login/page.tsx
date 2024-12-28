import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  
  return (
    <div className="my-auto">
        <Tabs defaultValue="login" className="w-[400px]">    
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login/>
          </TabsContent>
          <TabsContent value="signup">
            <Signup/>
          </TabsContent>
        </Tabs>
    </div>
  );
}
