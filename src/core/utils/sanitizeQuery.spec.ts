// sanitizeQuery.test.ts
import {sanitizeQuery} from './sanitizeQuery';

describe('sanitizeQuery', () => {
  it('should trim leading and trailing spaces', () => {
    const query = '  hello  ';
    const result = sanitizeQuery(query);
    expect(result).toBe('hello');
  });

  it('should encode special characters', () => {
    const query = 'hello&world';
    const result = sanitizeQuery(query);
    expect(result).toBe('hello%26world');
  });

  it('should handle empty string input', () => {
    const query = '  ';
    const result = sanitizeQuery(query);
    expect(result).toBe('');
  });

  it('should handle query with spaces in between', () => {
    const query = 'hello world';
    const result = sanitizeQuery(query);
    expect(result).toBe('hello%20world');
  });

  it('should not alter a valid query with no special characters', () => {
    const query = 'helloworld';
    const result = sanitizeQuery(query);
    expect(result).toBe('helloworld');
  });

  it('should handle query with multiple special characters', () => {
    const query = 'hello@world.com?name=test&age=25';
    const result = sanitizeQuery(query);
    expect(result).toBe('hello%40world.com%3Fname%3Dtest%26age%3D25');
  });
});
