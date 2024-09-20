import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {expect, beforeAll, afterAll, afterEach, test} from '@jest/globals';

const server = setupServer(
  http.get('https://example.com/api', () => {
    return HttpResponse.json({
      message: 'Hello World',
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('msw works', async () => {
  const response = await fetch('https://example.com/api');
  const data = await response.json();
  expect(data).toEqual({message: 'Hello World'});
});
