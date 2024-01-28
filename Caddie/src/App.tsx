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
import { ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Navbar from "@/components/ui/Navbar";
import React, { useState, useEffect } from "react";
import { Ai } from "@cloudflare/ai";
export interface Env {
	AI: any;
}
function App() {
  const [loading, setLoading] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [progress, setProgress] = useState(13)
  const [tab, setTab] = useState("file")
  const [goal, setGoal] = React.useState(350)
  const curLevel = 5
 
  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }
  const data: { goal: number, level: string, color: string}[]
   = [
    {
      goal: 200,
      level: "Alert",
      color: "#00ff00"
    },
    {
      goal: 300,
      level: "Advisory",
      color: "#1ce200"
    },
    {
      goal: 400,
      level: "Caution",
      color: "#38c600"
    },
    {
      goal: 500,
      level: "Watch",
      color: "#55aa00"
    },
    {
      goal: 600,
      level: "Warning",
      color: "#718d00"
    },
    {
      goal: 700,
      level: "Urgent",
      color: "#8d7100"
    },
    {
      goal: 800,
      level: "Critical",
      color: "aa5500"
    },
    {
      goal: 900,
      level: "Disaster",
      color: "#c63800"
    },
    {
      goal: 1000,
      level: "Catastrophe",
      color: "#e21c00"
    },
    {
      goal: 1100,
      level: "Apocalyptic",
      color: "#ff0000"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [
    loading
  ])

  useEffect(() => {
    if (transcribing) {
        startRecording();
    } else {
        stopRecording();
    }
    // Cleanup on component unmount
    return stopRecording;
  }, [transcribing]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            let audioChunks: BlobPart[] | undefined = [];

            const sendChunk = () => {
                const audioBlob = new Blob(audioChunks);
                sendAudioChunk(audioBlob); // Implement this function to send the chunk to your server
                audioChunks = []; // Reset chunks for the next recording
            };

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks!.push(event.data);
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop(); // Stop to finalize this chunk
                }
            });

            mediaRecorder.addEventListener("stop", () => {
                sendChunk();
                if (transcribing) {
                    setTimeout(() => mediaRecorder.start(), 300); // Short delay before starting the next chunk
                }
            });

            mediaRecorder.start();
            setInterval(() => {
                if (transcribing && mediaRecorder.state === 'recording') {
                    mediaRecorder.stop(); // Stop every 3 seconds to trigger dataavailable
                }
            }, 3000);
        });
};


  const stopRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            stream.getTracks().forEach(track => track.stop());
        });
  };

  const sendAudioChunk = (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'chunk.wav');

    fetch(`https://api.cloudflare.com/client/v4/accounts/dde9339108a509d7bf4e9c005e9ecda2/ai/run/@cf/openai/whisper`, { // Use an environment variable for the Worker URL
    headers: { Authorization: "Bearer TU7kiMgDBOqfS9y5M7zMhc9Agwe0Dth4yj0iLAuy" },  
    method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
    .then(response => response.json())
    .then(data => {
      // Update your UI with the transcription data
      console.log('Transcription:', data.transcription);
    })
    .catch(error => console.error('Error sending audio chunk:', error));
  };

  
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
    <h1 className="text-4xl font-semibold mt-10">Your AI Emergency Call Assistant</h1>
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
                  <Input className="cursor-pointer" id="picture" type="file" />
                </div>
              </CardContent>
              <CardFooter>
              <DrawerTrigger asChild>
                <Button>Analyze Emergency Call</Button>
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
                  <Button disabled={transcribing} variant={
                    transcribing ? "outline": "default"
                  } onClick={
                    () => {
                      setTranscribing(true)
                    }
                  }>Start</Button>
                  <Button disabled={!transcribing}
                   variant={
                    transcribing ? "destructive": "outline"
                  } onClick={
                    () => {
                      setTranscribing(false)
                    }
                  }>Stop</Button>
                </div>
              </CardContent>
              <CardFooter>
              <DrawerTrigger asChild>
                <Button>Analyze Emergency Call</Button>
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
        {/* <DrawerContent> */}
        <div className="mx-auto w-full max-w-sm">
          {/* <DrawerHeader className="">
            <DrawerTitle className="">Call analysis</DrawerTitle>
            <DrawerDescription>Important Information at a Glance</DrawerDescription>
          </DrawerHeader> */}
          <div className="flex flex-row gap-x-[100px] items-center justify-center mt-10">
          <div className="flex-1  text-center">
            <p className="text-2xl font-semibold">Call Summary</p>
            <Textarea placeholder="Your live transcription will appear here..." className="text-black w-[400px] h-[200px]" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-2xl font-semibold">Recommendation</p>
            <Textarea placeholder="Your live transcription will appear here..." className="text-black w-[400px] h-[200px]" />
          </div>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold">
                  {data[curLevel-1].level}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Emergency Level
                </div>
              </div>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={
                  // only show the data up to the current level
                  data
                }>
                        <Bar
                        dataKey="goal"
                        // style={
                        //   {
                        //     fill: "hsl(var(--foreground))",
                        //     opacity: 0.9,
                        //   } as React.CSSProperties
                        // }
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill= {index <= curLevel-1 ? entry.color : "#000000"}
                            opacity={index <= curLevel-1 ? 0.9 : 0.2}
                          />
                        ))}
                      </Bar>
                   
      
                  
                  
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      {/* </DrawerContent> */}
  </DrawerContent>
      </Drawer>
      </div>
    </div>
    </>
  );
}
export default App;


