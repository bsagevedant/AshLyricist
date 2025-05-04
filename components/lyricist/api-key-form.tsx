"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ApiKeyForm() {
  const [apiKey, setApiKey] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = localStorage.getItem("gemini-api-key");
    if (storedKey) {
      setHasStoredKey(true);
      setApiKey(storedKey);
    }
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Gemini API key",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate validation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      localStorage.setItem("gemini-api-key", apiKey);
      setHasStoredKey(true);
      
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error Saving Key",
        description: "There was a problem saving your API key",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("gemini-api-key");
    setHasStoredKey(false);
    setApiKey("");
    
    toast({
      title: "API Key Removed",
      description: "Your Gemini API key has been removed",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Gemini API Key
        </CardTitle>
        <CardDescription>
          Enter your Gemini API key to use the lyric generation features.
          Your key is stored locally and never sent to our servers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          {hasStoredKey && (
            <div className="flex items-center gap-2 text-sm text-green-500 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>API key is saved in your browser</span>
            </div>
          )}
          <div className="text-sm text-muted-foreground flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              Your API key is stored only in your browser&apos;s local storage and is never sent to our servers.
              <a 
                href="https://ai.google.dev/tutorials/setup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80 ml-1"
              >
                Get your key here
              </a>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {hasStoredKey ? (
          <>
            <Button variant="ghost" onClick={handleRemoveKey}>
              Remove Key
            </Button>
            <Button onClick={handleSaveKey} disabled={isSubmitting}>
              Update Key
            </Button>
          </>
        ) : (
          <Button onClick={handleSaveKey} disabled={isSubmitting} className="ml-auto">
            {isSubmitting ? "Saving..." : "Save Key"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}