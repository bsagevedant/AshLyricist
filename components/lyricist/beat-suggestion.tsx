"use client";

import { useState, useEffect } from "react";
import { BeatData, BEAT_SUGGESTIONS } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Square } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BeatSuggestionProps {
  style: string;
  tone: string;
  category: string;
}

export function BeatSuggestion({ style, tone, category }: BeatSuggestionProps) {
  const [suggestedBeats, setSuggestedBeats] = useState<BeatData[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Find suitable beats based on style and tone
    const matchingBeats = BEAT_SUGGESTIONS.filter(beat => 
      beat.categories.includes(category) && 
      beat.moods.includes(tone)
    ).slice(0, 3);
    
    // If we don't have enough matches, add some random ones from the same category
    if (matchingBeats.length < 3) {
      const categoryBeats = BEAT_SUGGESTIONS.filter(beat => 
        beat.categories.includes(category) && 
        !matchingBeats.includes(beat)
      );
      
      while (matchingBeats.length < 3 && categoryBeats.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryBeats.length);
        matchingBeats.push(categoryBeats[randomIndex]);
        categoryBeats.splice(randomIndex, 1);
      }
    }
    
    setSuggestedBeats(matchingBeats);
    
    // Cleanup audio when component unmounts
    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [style, tone, category, audio]);

  const togglePlay = (beatUrl: string, beatTitle: string) => {
    if (currentlyPlaying === beatTitle) {
      // Stop currently playing audio
      if (audio) {
        audio.pause();
        setCurrentlyPlaying(null);
      }
    } else {
      // Stop current audio if any
      if (audio) {
        audio.pause();
      }
      
      // Play new audio
      const newAudio = new Audio(beatUrl);
      newAudio.play().catch(err => {
        console.error("Error playing audio:", err);
      });
      
      setAudio(newAudio);
      setCurrentlyPlaying(beatTitle);
      
      // When audio ends, reset the playing state
      newAudio.onended = () => {
        setCurrentlyPlaying(null);
      };
    }
  };

  if (suggestedBeats.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          We couldn&apos;t find any beats matching your criteria. Please try a different style or tone.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Based on your lyric style and tone, here are some beat suggestions that would complement your lyrics:
      </div>
      
      {suggestedBeats.map((beat, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
            <div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{beat.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline">{beat.bpm} BPM</Badge>
                  {beat.moods.slice(0, 2).map(mood => (
                    <Badge key={mood} variant="secondary">{mood}</Badge>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{beat.description}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => togglePlay(beat.previewUrl, beat.title)}
                >
                  {currentlyPlaying === beat.title ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </>
                  )}
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  asChild
                >
                  <a href={beat.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get Beat
                  </a>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
      
      <div className="text-xs text-muted-foreground mt-4">
        Note: All beat recommendations are royalty-free. Preview audio quality may be reduced.
      </div>
    </div>
  );
}