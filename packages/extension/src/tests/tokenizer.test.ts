import { describe, it, expect } from 'vitest';
import { Tokenizer } from '../services/tokenizer';

describe('Tokenizer', () => {
  const tokenizer = new Tokenizer();

  describe('camelCase', () => {
    it('should split camelCase identifiers', () => {
      expect(tokenizer.split('getUserName')).toEqual(['get', 'User', 'Name']);
      expect(tokenizer.split('isValid')).toEqual(['is', 'Valid']);
      expect(tokenizer.split('onClick')).toEqual(['on', 'Click']);
    });
  });

  describe('PascalCase', () => {
    it('should split PascalCase identifiers', () => {
      expect(tokenizer.split('UserController')).toEqual(['User', 'Controller']);
      expect(tokenizer.split('HttpRequest')).toEqual(['Http', 'Request']);
      expect(tokenizer.split('MyClass')).toEqual(['My', 'Class']);
    });
  });

  describe('snake_case', () => {
    it('should split snake_case identifiers', () => {
      expect(tokenizer.split('get_user_name')).toEqual(['get', 'user', 'name']);
      expect(tokenizer.split('is_valid')).toEqual(['is', 'valid']);
      expect(tokenizer.split('MAX_SIZE')).toEqual(['MAX', 'SIZE']);
    });
  });

  describe('kebab-case', () => {
    it('should split kebab-case identifiers', () => {
      expect(tokenizer.split('get-user-name')).toEqual(['get', 'user', 'name']);
      expect(tokenizer.split('my-component')).toEqual(['my', 'component']);
    });
  });

  describe('mixed cases', () => {
    it('should handle consecutive uppercase letters', () => {
      expect(tokenizer.split('XMLParser')).toEqual(['XML', 'Parser']);
      expect(tokenizer.split('parseXML')).toEqual(['parse', 'XML']);
      expect(tokenizer.split('getURLPath')).toEqual(['get', 'URL', 'Path']);
      expect(tokenizer.split('HTTPSConnection')).toEqual(['HTTPS', 'Connection']);
    });

    it('should handle mixed delimiters', () => {
      expect(tokenizer.split('get_userName')).toEqual(['get', 'user', 'Name']);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(tokenizer.split('')).toEqual([]);
    });

    it('should handle single word', () => {
      expect(tokenizer.split('user')).toEqual(['user']);
      expect(tokenizer.split('User')).toEqual(['User']);
    });

    it('should handle all uppercase', () => {
      expect(tokenizer.split('API')).toEqual(['API']);
      expect(tokenizer.split('HTTP')).toEqual(['HTTP']);
    });

    it('should handle numbers', () => {
      expect(tokenizer.split('user123')).toEqual(['user123']);
      expect(tokenizer.split('getUser2')).toEqual(['get', 'User2']);
    });
  });
});
