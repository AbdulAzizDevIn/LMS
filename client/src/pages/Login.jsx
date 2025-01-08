import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleReg = (type)=>{
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log(inputData);

    
  }

  
  return (
    <div className="flex items-center w-full justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you Ill be logged in.{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e)=>changeInputHandler(e,"login")}
                  type="email"
                  name="email"
                  value={loginInput.email}
                  placeholder="example@email.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e)=>changeInputHandler(e,"login")}
                  name="password"
                  type="password"
                  value={loginInput.password}
                  placeholder="Eg. xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={(()=>handleReg("login"))}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e)=>changeInputHandler(e,"signup")}
                  name="name"
                  type="text"
                  value={signupInput.name}
                  placeholder="Eg. Abdul Aziz"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e)=>changeInputHandler(e,"signup")}
                  name="email"
                  type="email"
                  value={signupInput.email}
                  placeholder="example@email.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e)=>changeInputHandler(e,"signup")}
                  name="password"
                  type="password"
                  value={signupInput.password}
                  placeholder="Eg. xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={(()=>handleReg("signup"))}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
