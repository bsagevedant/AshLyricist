"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MusicIcon, PenTool, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateLyrics } from "@/lib/generate-lyrics";
import { LYRIC_STYLES, TONE_OPTIONS } from "@/lib/constants";

export function LyricForm({ onLyricsGenerated }: { onLyricsGenerated: (lyrics: string, style: string, tone: string, prompt: string) => void }) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("rap");
  const [tone, setTone] = useState("confident");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt for your lyrics",
        variant: "destructive",
      });
      return;
    }

    const apiKey = localStorage.getItem("gemini-api-key");
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your Gemini API key first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const lyrics = await generateLyrics(prompt, style, tone, apiKey);
      onLyricsGenerated(lyrics, style, tone, prompt);
      
      toast({
        title: "Lyrics Generated",
        description: "Your custom lyrics have been created!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate lyrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Create Lyrics
          </CardTitle>
          <CardDescription>
            Enter a theme, mood, or prompt to generate custom lyrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="prompt">Your Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="E.g., heartbreak at midnight, success grind, divine love..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="style">Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {LYRIC_STYLES.map((styleOption) => (
                    <SelectItem key={styleOption.value} value={styleOption.value}>
                      {styleOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {TONE_OPTIONS.map((toneOption) => (
                    <SelectItem key={toneOption.value} value={toneOption.value}>
                      {toneOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isGenerating}
            size="lg"
          >
            {isGenerating ? (
              <>
                <MusicIcon className="mr-2 h-4 w-4 animate-spin" />
                Crafting Lyrics...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Lyrics
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}