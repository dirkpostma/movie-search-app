# Development log Movie Search App

## deprecated renderer.create
- renderer.create from react-test-renderer is deprecated
- added @testing-library/react-native
Reference: https://react.dev/warnings/react-test-renderer

## Setup redux toolkit

Followed guide on https://redux-toolkit.js.org/tutorials/quick-start

## Search movies with infinite scroll

Implemented search movies with infinite scroll.

Ideas to improve:
- sanitize user input to prevent that user can inject query params
- debounce user input
- fix out-of-order: api responses can be slow and out of order. If a user is typing, a search may be overwritten by a slow response triggered earlier. Solution could be to add a useRef request counter and only process result if the counter has not changed inbetween.

To investigate:
- Does RTK Query support infinite scroll out of the box?
- How to get redux devtools running with redux toolkit + hermes?

## UI components

Added UI components using atomic design principle. Only atoms are allowed to have styling, rest of components are built strictly using atoms. To have good separation of concerns, UI components don't have any business logic.

## Mocking the API

### Challenge: mock global fetch
For unit- and E2E testing, its imperative to be able to mock external dependencies, in this case, the API of themoviedb.org. The default setup of RTK Query uses global `fetch` to fetch data. Several attemps were made to replace this global fetch function with a mocked one. This was quite hard as RTK Query uses the `response.clone`, which appears hard to mock properly. Also, libraries such as `jest-fetch-mock` didn't mock the clone function, making them unsuitable for our use case.

### Mock Service Worker

For jest environment I managed to use MSW (Mock Service Worker), as recommended in the [redux docs](https://redux.js.org/usage/writing-tests#ui-and-network-testing-tools). Unfortunately, for E2E tests, although [it should be possible](https://mswjs.io/docs/integrations/react-native/) I didn't manage to integrate MSW in React Native builds succesfully.

### Mock baseQuery

After giving this some thoughts, I got the idea to mock on a level higher: in stead of replacing `global.fetch`, can't we use tell RTK Query to use another fetch function? And yes, this is possible. I ended up writing a proof of concept of testing with a replaced `baseQuery`, see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery

This approach has several benefits: 
- no complexities of dealing with `global.fetch` and mocking `response.clone`
- the same mocking aproach can be used for both unit tests and E2E tests
- no external mocking libraries needed

## Improve Hook Search Infinite Scroll

The hook that takes care of infinite scroll for the search feature is improved. Using `transformResponse` we add the query to the response. That way, in the hook we can check if the response actually belongs to the current query. If not, the results are ignored. The fetch function can now be set dynamically, so we can e.g. mock and test error responses.

## Solve race conditions with requestId counter

Race conditions with respect to infinite scroll and search are now solved differently: to make sure only pages are added to the list that belong to the current query, a requestId is set before fetching page. If a response comes in, the requestId is compared with saved request id before the fetch. If the requestId or query don't match, incoming data is ignored.

## Combined search & popular hooks

After creating an inifite query hook for popular movies, I also create a hook that combines the search and popular queryies. This way, the results can be share on a single page. If query is empty, the movie list is populated with popular movies, otherwise, its populate with search results.