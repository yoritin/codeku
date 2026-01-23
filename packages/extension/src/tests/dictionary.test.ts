import { describe, it, expect } from 'vitest';
import { DictionaryService } from '../services/dictionary';

describe('DictionaryService', () => {
  const dictionary = new DictionaryService();

  describe('getReading', () => {
    it('should return reading for common words', () => {
      expect(dictionary.getReading('get')).toBe('ゲット');
      expect(dictionary.getReading('user')).toBe('ユーザー');
      expect(dictionary.getReading('function')).toBe('ファンクション');
    });

    it('should be case-insensitive for words', () => {
      expect(dictionary.getReading('GET')).toBe('ゲット');
      expect(dictionary.getReading('Get')).toBe('ゲット');
      expect(dictionary.getReading('get')).toBe('ゲット');
    });

    it('should return reading for abbreviations', () => {
      expect(dictionary.getReading('API')).toBe('エーピーアイ');
      expect(dictionary.getReading('HTTP')).toBe('エイチティーティーピー');
      expect(dictionary.getReading('JSON')).toBe('ジェイソン');
    });

    it('should return undefined for unknown words', () => {
      expect(dictionary.getReading('xyz')).toBeUndefined();
      expect(dictionary.getReading('foobar')).toBeUndefined();
    });
  });

  describe('hasWord', () => {
    it('should return true for existing words', () => {
      expect(dictionary.hasWord('get')).toBe(true);
      expect(dictionary.hasWord('API')).toBe(true);
    });

    it('should return false for non-existing words', () => {
      expect(dictionary.hasWord('xyz')).toBe(false);
    });
  });
});
