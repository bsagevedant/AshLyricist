interface FormattedLine {
  content: string;
  type: 'heading' | 'content';
}

/**
 * Formats raw lyrics text into structured content with headings
 */
export function formatLyrics(lyrics: string): FormattedLine[] {
  const lines = lyrics.split('\n');
  const formattedLines: FormattedLine[] = [];
  
  for (let line of lines) {
    line = line.trim();
    if (!line) {
      continue; // Skip empty lines
    }
    
    // Check if this is a heading (section marker)
    const isHeading = line.toUpperCase() === line && 
      (line.includes('VERSE') || 
       line.includes('CHORUS') || 
       line.includes('HOOK') || 
       line.includes('BRIDGE') || 
       line.includes('INTRO') || 
       line.includes('OUTRO') ||
       line.includes('PRE-CHORUS') ||
       line.includes('REFRAIN'));
    
    formattedLines.push({
      content: line,
      type: isHeading ? 'heading' : 'content'
    });
  }
  
  return formattedLines;
}