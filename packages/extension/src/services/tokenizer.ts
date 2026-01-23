/**
 * Tokenizer for splitting code identifiers into words
 * Supports: camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE
 */
export class Tokenizer {
  /**
   * Split an identifier into individual words
   * @param identifier - The identifier to split (e.g., "getUserName", "get_user_name")
   * @returns Array of words (e.g., ["get", "User", "Name"])
   */
  split(identifier: string): string[] {
    if (!identifier) {
      return [];
    }

    // Handle snake_case and kebab-case first
    if (identifier.includes('_') || identifier.includes('-')) {
      return this.splitByDelimiter(identifier);
    }

    // Handle camelCase and PascalCase
    return this.splitByCamelCase(identifier);
  }

  /**
   * Split by underscore or hyphen delimiter
   */
  private splitByDelimiter(identifier: string): string[] {
    return identifier
      .split(/[_-]+/)
      .filter(token => token.length > 0)
      .flatMap(token => this.splitByCamelCase(token));
  }

  /**
   * Split by camelCase boundaries
   * Handles: camelCase, PascalCase, XMLParser, parseXML, getURLPath
   */
  private splitByCamelCase(identifier: string): string[] {
    const tokens: string[] = [];
    let current = '';

    for (let i = 0; i < identifier.length; i++) {
      const char = identifier[i];
      const nextChar = identifier[i + 1];
      const prevChar = identifier[i - 1];

      const isUpper = this.isUpperCase(char);
      const isNextLower = nextChar && this.isLowerCase(nextChar);
      const isPrevLower = prevChar && this.isLowerCase(prevChar);

      // Start of a new word
      if (isUpper && (isPrevLower || (current.length > 0 && isNextLower))) {
        if (current) {
          tokens.push(current);
        }
        current = char;
      } else {
        current += char;
      }
    }

    if (current) {
      tokens.push(current);
    }

    return tokens.filter(token => token.length > 0);
  }

  private isUpperCase(char: string): boolean {
    return char >= 'A' && char <= 'Z';
  }

  private isLowerCase(char: string): boolean {
    return char >= 'a' && char <= 'z';
  }
}
