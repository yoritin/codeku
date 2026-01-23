import wordsData from '../data/words.json';
import abbreviationsData from '../data/abbreviations.json';

interface WordEntry {
  word: string;
  reading: string;
}

interface AbbreviationEntry {
  abbr: string;
  reading: string;
  fullForm?: string;
}

/**
 * Dictionary service for looking up Japanese readings of English words
 */
export class DictionaryService {
  private wordMap: Map<string, string>;
  private abbreviationMap: Map<string, string>;

  constructor() {
    this.wordMap = new Map();
    this.abbreviationMap = new Map();
    this.loadDictionaries();
  }

  private loadDictionaries(): void {
    // Load words
    for (const entry of wordsData as WordEntry[]) {
      this.wordMap.set(entry.word.toLowerCase(), entry.reading);
    }

    // Load abbreviations
    for (const entry of abbreviationsData as AbbreviationEntry[]) {
      this.abbreviationMap.set(entry.abbr.toLowerCase(), entry.reading);
      this.abbreviationMap.set(entry.abbr.toUpperCase(), entry.reading);
    }
  }

  /**
   * Get the Japanese reading for a word or abbreviation
   * @param word - The word to look up (case-insensitive)
   * @returns The Japanese reading, or undefined if not found
   */
  getReading(word: string): string | undefined {
    const normalizedWord = word.toLowerCase();
    
    // Check abbreviations first (exact match, case-insensitive)
    const abbrReading = this.abbreviationMap.get(word) || this.abbreviationMap.get(normalizedWord);
    if (abbrReading) {
      return abbrReading;
    }

    // Check regular words
    return this.wordMap.get(normalizedWord);
  }

  /**
   * Check if a word exists in the dictionary
   */
  hasWord(word: string): boolean {
    const normalizedWord = word.toLowerCase();
    return this.wordMap.has(normalizedWord) || this.abbreviationMap.has(normalizedWord);
  }

  /**
   * Get all words in the dictionary (for debugging/testing)
   */
  getAllWords(): string[] {
    return [...this.wordMap.keys(), ...this.abbreviationMap.keys()];
  }
}
