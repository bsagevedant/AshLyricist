"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatLyrics } from "@/lib/format-lyrics";
import { getCategoryFromStyle, getToneEmoji } from "@/lib/utils";
import { 
  ClipboardCopy, 
  Download,
  Music,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BeatSuggestion } from "@/components/lyricist/beat-suggestion";

interface LyricsDisplayProps {
  lyrics: string;
  style: string;
  tone: string;
  prompt: string;
}

export function LyricsDisplay({ lyrics, style, tone, prompt }: LyricsDisplayProps) {
  const [currentTab, setCurrentTab] = useState("lyrics");
  const { toast } = useToast();
  
  const formattedLyrics = formatLyrics(lyrics);
  const category = getCategoryFromStyle(style);
  const toneEmoji = getToneEmoji(tone);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
    toast({
      title: "Copied to clipboard",
      description: "Lyrics have been copied to your clipboard"
    });
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([lyrics], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${prompt.substring(0, 20).replace(/\s+/g, "-")}-lyrics.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Lyrics have been downloaded as a text file"
    });
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${prompt} - Lyrics by AshLyricist`,
          text: lyrics,
        });
        toast({
          title: "Shared successfully",
          description: "Your lyrics have been shared"
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          toast({
            title: "Sharing failed",
            description: "Unable to share your lyrics",
            variant: "destructive"
          });
        }
      }
    } else {
      handleCopyToClipboard();
      toast({
        title: "Share not supported",
        description: "Sharing is not supported on this device. Lyrics copied to clipboard instead."
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Generated Content</span>
          <div className="text-sm font-normal bg-secondary rounded-full px-3 py-1 flex items-center">
            {toneEmoji} {tone.charAt(0).toUpperCase() + tone.slice(1)} {style.charAt(0).toUpperCase() + style.slice(1)}
          </div>
        </CardTitle>
        <CardDescription>
          Based on your prompt: &quot;{prompt}&quot;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
            <TabsTrigger value="beats">Beat Suggestion</TabsTrigger>
          </TabsList>
          <TabsContent value="lyrics" className="mt-4">
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="whitespace-pre-line">
                {formattedLyrics.map((line, index) => (
                  <div key={index} className={line.type === "heading" ? "font-bold text-lg mt-4 mb-2" : "mb-1"}>
                    {line.content}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="beats" className="mt-4">
            <BeatSuggestion 
              style={style} 
              tone={tone} 
              category={category}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
            <ClipboardCopy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        <Button variant="default" size="sm" onClick={() => setCurrentTab("beats")} className={currentTab === "beats" ? "hidden" : ""}>
          <Music className="h-4 w-4 mr-2" />
          Find a Beat
        </Button>
      </CardFooter>
    </Card>
  );
}