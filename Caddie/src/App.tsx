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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "./components/ui/textarea";

import Navbar from "@/components/ui/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <div className="bg-gray-800 min-h-screen flex flex-col items-center text-white">
    <h1 className="text-4xl font-semibold mt-10">Turn your business call into your next investment</h1>
      <div className='p-10 flex text-center flex-col items-center'>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Audio File</TabsTrigger>
            <TabsTrigger value="password">Transcript</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Audio File</CardTitle>
                <CardDescription>
                  Upload your audio file here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">.wav files only</Label>
                  <Input id="picture" type="file" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Get investment data </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Transcript</CardTitle>
                <CardDescription>
                  Paste your business meeting transcript here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Textarea placeholder="Paste here..." id="name" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Get investment data</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
}

export default App;
