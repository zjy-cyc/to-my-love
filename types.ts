export interface DateMetrics {
  daysSinceMet: number;
  daysTogether: number;
  daysSinceLastMet: number;
}

export interface MemoryLocation {
  id: number;
  position: [number, number];
  title: string;
  description: string;
}

export interface SectionProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export interface DiaryEntry {
  title: string;
  date: string;
  content: string;
  color: string;
  image?: string; // Optional URL for the polaroid picture
}