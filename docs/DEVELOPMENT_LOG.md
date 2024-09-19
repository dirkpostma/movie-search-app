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
