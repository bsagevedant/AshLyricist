"use client";

import { useState } from "react";
import { ApiKeyForm } from "@/components/lyricist/api-key-form";
import { LyricForm } from "@/components/lyricist/lyric-form";
import { LyricsDisplay } from "@/components/lyricist/lyrics-display";
import { MusicIcon } from "lucide-react";

export default function Home() {
  const [generatedLyrics, setGeneratedLyrics] = useState<string | null>(null);
  const [lyricStyle, setLyricStyle] = useState<string>("");
  const [lyricTone, setLyricTone] = useState<string>("");
  const [lyricPrompt, setLyricPrompt] = useState<string>("");

  const handleLyricsGenerated = (lyrics: string, style: string, tone: string, prompt: string) => {
    setGeneratedLyrics(lyrics);
    setLyricStyle(style);
    setLyricTone(tone);
    setLyricPrompt(prompt);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="container py-10 px-4 md:px-6 flex flex-col items-center">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 text-center w-full max-w-4xl">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            <span className="mr-1">✨</span> Your Personal AI Lyricist &amp; Beat Companion
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Turn ideas into <span className="text-primary">lyrics</span> in seconds
          </h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground">
            AshLyricist helps you transform your emotions, themes, and ideas into beautiful lyrics with matching beats — powered by AI.
          </p>
          <div className="flex justify-center pt-4">
            <a href="#start" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Create Lyrics
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MusicIcon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-xl font-bold">AI Lyric Generator</h3>
            <p className="text-muted-foreground">Choose your style, set the tone, and provide a theme. Get polished lyrics in seconds.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MusicIcon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Beat Recommendations</h3>
            <p className="text-muted-foreground">Get beat suggestions that match your lyrics&apos; mood and style with links to royalty-free samples.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MusicIcon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Easy Sharing</h3>
            <p className="text-muted-foreground">Copy, download, or share your lyrics directly to social media with one click.</p>
          </div>
        </div>
      </section>
      
      <hr className="my-8 w-full" />
      
      {/* API Key Section */}
      <section id="start" className="py-8 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">First, connect your Gemini API key</h2>
        <ApiKeyForm />
      </section>
      
      {/* Lyric Generation Form */}
      <section className="py-8 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your custom lyrics</h2>
        <LyricForm onLyricsGenerated={handleLyricsGenerated} />
      </section>
      
      {/* Results Section - only show when lyrics are generated */}
      {generatedLyrics && (
        <section id="results" className="py-8 w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Your lyrics are ready!</h2>
          <LyricsDisplay 
            lyrics={generatedLyrics} 
            style={lyricStyle} 
            tone={lyricTone} 
            prompt={lyricPrompt}
          />
        </section>
      )}
    </div>
  );
}