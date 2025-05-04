import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the emoji representation for a tone
 */
export function getToneEmoji(tone: string): string {
  switch (tone) {
    case 'sad':
      return '😢';
    case 'confident':
      return '💪';
    case 'chill':
      return '😌';
    case 'upbeat':
      return '🥳';
    case 'melancholy':
      return '🥺';
    default:
      return '🎵';
  }
}

/**
 * Maps a lyric style to a broader category for beat selection
 */
export function getCategoryFromStyle(style: string): string {
  switch (style) {
    case 'rap':
      return 'rap';
    case 'rnb':
      return 'rnb';
    case 'pop':
      return 'pop';
    case 'indie':
      return 'indie';
    case 'lofi':
      return 'lofi';
    default:
      return 'pop';
  }
}