export const LYRIC_STYLES = [
  { value: "rap", label: "Rap" },
  { value: "rnb", label: "R&B" },
  { value: "pop", label: "Pop" },
  { value: "indie", label: "Indie" },
  { value: "lofi", label: "Lo-fi Poetry" }
];

export const TONE_OPTIONS = [
  { value: "sad", label: "Sad" },
  { value: "confident", label: "Confident" },
  { value: "chill", label: "Chill" },
  { value: "upbeat", label: "Upbeat" },
  { value: "melancholy", label: "Melancholy" }
];

export interface BeatData {
  title: string;
  description: string;
  bpm: number;
  categories: string[];
  moods: string[];
  url: string;
  previewUrl: string;
}

export const BEAT_SUGGESTIONS: BeatData[] = [
  {
    title: "Urban Flow",
    description: "A modern trap beat with heavy 808s, perfect for confident rap lyrics.",
    bpm: 140,
    categories: ["rap", "trap"],
    moods: ["confident", "upbeat"],
    url: "https://www.looperman.com/loops/detail/296382/drill-loop-type-beat-140bpm-drill-loop",
    previewUrl: "https://www.looperman.com/media/loops/296382/looperman-l-0296382-0334574-drill-loop-type-beat.mp3"
  },
  {
    title: "Midnight Blues",
    description: "A smooth R&B beat with lush chords and a gentle drum pattern.",
    bpm: 90,
    categories: ["rnb", "soul"],
    moods: ["melancholy", "sad"],
    url: "https://www.looperman.com/loops/detail/296366/lofi-piano-90bpm-lofi-piano-loop",
    previewUrl: "https://www.looperman.com/media/loops/296366/looperman-l-0296366-0334525-lofi-piano.mp3"
  },
  {
    title: "Sunshine Pop",
    description: "Bright and energetic pop instrumental with catchy melody.",
    bpm: 120,
    categories: ["pop"],
    moods: ["upbeat", "confident"],
    url: "https://www.looperman.com/loops/detail/296352/indie-pop-melody-120bpm-indie-pop-melody-loop",
    previewUrl: "https://www.looperman.com/media/loops/296352/looperman-l-0296352-0334495-indie-pop-melody.mp3"
  },
  {
    title: "Indie Vibes",
    description: "Atmospheric indie beat with dreamy guitars and subtle percussion.",
    bpm: 105,
    categories: ["indie", "alternative"],
    moods: ["chill", "melancholy"],
    url: "https://www.looperman.com/loops/detail/296349/ambient-guitar-b-min-105bpm-ambient-guitar-loop",
    previewUrl: "https://www.looperman.com/media/loops/296349/looperman-l-0296349-0334473-ambient-guitar-b-min.mp3"
  },
  {
    title: "Hazy Memories",
    description: "Lo-fi beat with vinyl crackle and mellow piano samples.",
    bpm: 85,
    categories: ["lofi", "chill"],
    moods: ["sad", "melancholy"],
    url: "https://www.looperman.com/loops/detail/296339/abstract-ambient-85bpm-ambient-pad-loop",
    previewUrl: "https://www.looperman.com/media/loops/296339/looperman-l-0296339-0334457-abstract-ambient.mp3"
  },
  {
    title: "Street Corner",
    description: "Classic boom bap beat with jazzy samples and crisp drums.",
    bpm: 95,
    categories: ["rap", "hiphop"],
    moods: ["confident", "chill"],
    url: "https://www.looperman.com/loops/detail/296319/hip-hop-piano-95bpm-hip-hop-piano-loop",
    previewUrl: "https://www.looperman.com/media/loops/296319/looperman-l-0296319-0334400-hip-hop-piano.mp3"
  },
  {
    title: "Neon Nights",
    description: "Synth-heavy R&B with modern production and atmospheric elements.",
    bpm: 100,
    categories: ["rnb", "pop"],
    moods: ["chill", "melancholy"],
    url: "https://www.looperman.com/loops/detail/296299/r-b-pad-100bpm-r-b-pad-loop",
    previewUrl: "https://www.looperman.com/media/loops/296299/looperman-l-0296299-0334338-r-b-pad.mp3"
  },
  {
    title: "Summer Anthem",
    description: "Uplifting pop instrumental with catchy hooks and bright synths.",
    bpm: 128,
    categories: ["pop", "dance"],
    moods: ["upbeat", "confident"],
    url: "https://www.looperman.com/loops/detail/296202/dance-pop-128bpm-dance-synth-loop",
    previewUrl: "https://www.looperman.com/media/loops/296202/looperman-l-0296202-0334089-dance-pop.mp3"
  },
  {
    title: "Acoustic Dreams",
    description: "Tender indie folk instrumental with acoustic guitar and soft percussion.",
    bpm: 110,
    categories: ["indie", "folk"],
    moods: ["sad", "melancholy"],
    url: "https://www.looperman.com/loops/detail/296200/lofi-guitar-110bpm-lofi-guitar-loop",
    previewUrl: "https://www.looperman.com/media/loops/296200/looperman-l-0296200-0334085-lofi-guitar.mp3"
  },
  {
    title: "Rainy Days",
    description: "Atmospheric lo-fi beat with piano and subtle nature sounds.",
    bpm: 80,
    categories: ["lofi", "ambient"],
    moods: ["sad", "chill"],
    url: "https://www.looperman.com/loops/detail/296197/gloaming-80bpm-ambient-piano-loop",
    previewUrl: "https://www.looperman.com/media/loops/296197/looperman-l-0296197-0334077-gloaming.mp3"
  }
];

export const GEMINI_PROMPT_TEMPLATE = (prompt: string, style: string, tone: string) => `
Create original song lyrics based on the following criteria:

Theme/Prompt: ${prompt}
Style: ${style}
Tone: ${tone}

The lyrics should include a verse, chorus, and hook structure. Make them creative, emotionally resonant, and authentic to the style requested. 
Format the lyrics clearly with section headings (VERSE, CHORUS, etc.) and keep the language appropriate.

Do not include any explanations or notes - only output the lyrics themselves.
`;