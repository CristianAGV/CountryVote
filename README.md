# CountryVote App

This project is a React application built with [Vite](https://vitejs.dev/) for fast development and optimized builds.

## 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

Or

```bash
yarn install
```

### 3. Run the app locally

```bash
npm run dev
```

Or

```bash
yarn dev
```

## 📘 Tech stack

- React 19
- Vite
- TypeScript
- React Query
- MUI (Material UI)
- p-limit (for controlling concurrency)

## 📘 Approach to resolve the challenge

To resolve this challenge, I used the React Context API to manage a centralized state shared across the app, avoiding prop drilling. For fetching weather information for all mocked countries, I chose React Query, which simplifies data fetching, provides built-in loading and error states, and leverages caching — an important feature for production environments.

Weather data is fetched in parallel with a limit of 5 concurrent requests. Each request includes error handling with fallback values to ensure the UI remains stable. Main components use useState, useEffect, and useMemo for managing local state and optimizing renders.

Input validation ensures fields are not empty and validates emails using a regex. If inputs are invalid, error messages are shown below the fields along with styling changes and a warning icon.

Upon clicking the submit button, and after validation passes, a context method updates the country’s vote count and sets a submitted flag used to trigger a success alert.

The countries are displayed in a table filtered by search input (Country, Capital City, Region, and Sub Region) and paginated to show 10 results per page. The search is debounced to improve performance by filtering only after the user stops typing.

Since weather data may still be loading when the table is rendered, I added MUI skeletons in the weather column to indicate loading and enhance user experience.
