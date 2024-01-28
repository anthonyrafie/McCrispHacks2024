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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Progress } from "@/components/ui/progress"


import Navbar from "@/components/ui/Navbar";
import React, { useState, useEffect } from "react";


function App() {
  const [loading, setLoading] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [progress, setProgress] = useState(13)
  const [tab, setTab] = useState("file")
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [
    loading
  ])
  // if (loading) {
  //   return (
  //     <div className="bg-gray-800 min-h-screen flex flex-col items-center text-white">
  //       <Progress value={progress} className="w-[60%]" />

  //     </div>
  //   );
  // }


  return (
    <>
    <Navbar />
    <div className="bg-gray-800 min-h-screen flex flex-col items-center text-white">
    <h1 className="text-4xl font-semibold mt-10">Turn your business call into your next investment</h1>
      <div className='p-10 flex text-center flex-col items-center'>
      <Drawer>
        <div className="flex flex-row gap-x-5">
        <Tabs defaultValue="file" className="w-[400px]" onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Audio File</TabsTrigger>
            <TabsTrigger value="live">Live Transcription</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
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
              <DrawerTrigger>
                <Button>Get investment data </Button>
              </DrawerTrigger>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="live">
            <Card>
              <CardHeader>
                <CardTitle>Live Transcription</CardTitle>
                <CardDescription>
                  Paste your business meeting transcript here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1 space-x-10">
                  <Button onClick={
                    () => {
                      setTranscribing(true)
                    }
                  }>Start</Button>
                  <Button onClick={
                    () => {
                      setTranscribing(false)
                    }
                  }>Stop</Button>
                </div>
              </CardContent>
              <CardFooter>
              <DrawerTrigger>
                <Button>Get investment data</Button>
              </DrawerTrigger>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {
          tab === "live" ? (
            <Textarea placeholder="Your live transcription will appear here..." className="text-black w-[400px]" />
          ) : (
            null
          )
        }
        </div>
        <DrawerContent className="items-center">
    <DrawerHeader className="">
      <DrawerTitle className="text-[32px]">Tell us a bit more</DrawerTitle>
      <DrawerDescription>This will help your Caddie analyze your call</DrawerDescription>
    </DrawerHeader>
    <div className="flex flex-row">
    <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
</div>
    <DrawerFooter>
      {
        loading ? (
          <Progress value={progress} className="w-[200px]" />
        ) : (
          <Button onClick={
            () => {
              setLoading(true)
              // setTimeout(() => {
              //   setLoading(false)
              // }, 2000)
            }
          } className="w-[200px]">
          Submit
        </Button>
        )
      }
      <DrawerClose>
        <Button className="w-[200px]" variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
      </Drawer>
      </div>
    </div>
    </>
  );
}

export default App;
