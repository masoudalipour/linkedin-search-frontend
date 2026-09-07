# Simple LinkedIn Profile Search Frontend

## Getting Started

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal, typically `http://localhost:5173`.

To create a production build and preview it locally:

```bash
npm run build
npm run preview
```

## Project Structure

- `src/main.tsx` bootstraps React and provides React Query.
- `src/App.tsx` mounts the main search page.
- `src/pages/search-page.tsx` manages search filters, pagination, loading, and error states.
- `src/components/` contains reusable UI for autocomplete inputs and profile result cards.
- `src/api/` contains Axios clients for profile search and filter autocomplete requests.
- `src/types/` defines the TypeScript shapes returned by the API.
- `src/index.css` and `src/App.css` contain the application styles.

## How It Works

1. `src/main.tsx` starts the React application and wraps it with `QueryClientProvider`, which gives the components React Query for fetching and caching server data.
2. `SearchPage` stores the values currently being edited separately from the filters that were last submitted. This means typing in a field does not trigger a profile search until the form is submitted.
3. The skill and job title fields use `AutocompleteInput`. After the user types at least two characters, the input waits 300 milliseconds and requests suggestions from `GET /autocomplete`. Selecting a suggestion updates the corresponding filter.
4. Submitting the search calls `GET /search` through `search-api.ts`. The request includes the search text, selected skill, selected job title, and page number. React Query uses these values as the query key, so results are cached and refreshed when the submitted filters or page change.
5. The API response contains the total number of matches, the current profile results, and the next page number. `ResultCard` displays each profile, while the page also handles loading, empty-result, updating, and retry states.
6. The Previous and Next buttons update the page number and trigger another search. Applying new filters or clearing the filters resets the page back to 1.
