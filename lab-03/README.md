# React Assignment: Smart Weather Dashboard

## Overview

This project is an offline Smart Weather Dashboard built with React, TypeScript, and Vite. It demonstrates functional components, local state management, props communication, controlled form components, the `useEffect` hook, `useContext`, and the Context API.

Users can enter weather information, view it in weather cards, search by city, and delete individual records. The dashboard also creates a new random weather record every five seconds without using an internet connection.

## Assignment Task

Design and implement a Smart Weather Dashboard using React functional components. The application must demonstrate:

- `useState` for storing form values and weather records.
- Controlled components for City Name, Temperature, Condition, Humidity, and Wind Speed.
- Form validation, local storage of submitted data in component state, and form clearing after submission.
- A `WeatherCard` child component that receives weather data through props.
- `useEffect` to add random city weather data every five seconds.
- A timestamp showing when each record was created or updated.
- A `ThemeContext` using the Context API.
- Dynamic theme colors based on the latest temperature:
  - Below 20°C: cool blue
  - 20–30°C: mild green
  - 31–40°C: warm orange
  - Above 40°C: hot red
- Cleanup of the five-second interval when the component is unmounted.
- An appropriate empty-state message when no weather data exists.

Bonus functionality included in this implementation:

- Search weather cards by city name.
- Delete individual weather cards.
- Responsive layout and accessible form labels.

## Codebase Structure

```text
lab-03/
├── public/                 # Static public assets
├── src/
│   ├── App.tsx             # Application root and ThemeProvider wrapper
│   ├── App.css             # Dashboard, form, card, and responsive styles
│   ├── Dashboard.tsx       # Main state, timer, search, theme, and card rendering
│   ├── ThemeContext.tsx    # Global theme context and provider
│   ├── WeatherCard.tsx     # Presentational card for one weather record
│   ├── WeatherForm.tsx     # Controlled weather input form and validation
│   ├── index.css           # Global page styles and background
│   ├── main.tsx            # React entry point
│   └── types.ts            # Shared WeatherData TypeScript interface
├── index.html              # HTML entry document
├── package.json            # Scripts and dependencies
├── tsconfig*.json          # TypeScript configuration
├── vite.config.ts          # Vite and React Compiler configuration
└── README.md               # Project and assignment documentation
```

## Component Responsibilities

### `App.tsx`

Wraps the dashboard in `ThemeProvider`, making the global theme available to the application.

### `Dashboard.tsx`

Owns the `weatherList` and `searchQuery` state. It:

1. Adds submitted weather data received from `WeatherForm`.
2. Creates random weather records every five seconds with `setInterval`.
3. Cleans up the interval with `clearInterval` in the `useEffect` return handler.
4. Changes the theme based on the newest record's temperature.
5. Filters records by the search input.
6. Passes each record and the delete handler to `WeatherCard` through props.

### `WeatherForm.tsx`

Uses controlled inputs: every field is tied to `formData` state and updated through `handleChange`. On submission, it:

- Requires all fields.
- Trims the city name.
- Validates temperature from -90°C to 60°C.
- Validates humidity from 0% to 100%.
- Requires a non-negative wind speed.
- Converts numeric fields from strings to numbers.
- Sends a complete `WeatherData` object to the parent through `onAddData`.
- Clears the form after successful submission.

### `WeatherCard.tsx`

Receives one `WeatherData` object and an `onDelete` callback as props. It displays the city, temperature, condition, humidity, wind speed, timestamp, and delete action.

### `ThemeContext.tsx`

Defines and provides the current theme color and its setter. `Dashboard` updates the color globally according to the latest temperature, while `ThemeProvider` applies it to the application background.

## Data Shape

The shared `WeatherData` interface contains:

```ts
interface WeatherData {
  id: number;
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  timestamp: string;
}
```

## Running the Project

From the `lab-03` directory:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal. The application is fully offline at runtime and uses generated local data rather than an external weather API.

## Validation Commands

```bash
npm run lint
npm run build
```

The build command runs TypeScript checking and creates the production Vite bundle.
