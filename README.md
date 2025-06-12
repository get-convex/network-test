# Convex Browser Network Test

A diagnostic tool to test if a browser/network can properly connect to Convex services using different protocols.

## Purpose

This application helps customers troubleshoot connectivity issues with Convex by testing:

1. **WebSocket Connection** - Tests if the browser can establish and maintain a WebSocket connection to Convex
2. **HTTP Connection** - Tests if the browser can make regular HTTP requests to Convex endpoints
3. **Server-Sent Events (SSE)** - Tests if the browser can connect to and receive Server-Sent Events from Convex

## Features

- Real-time WebSocket connection status monitoring
- One-click HTTP request testing
- SSE connection testing with message streaming
- Detailed connection diagnostics
- Clean, responsive UI

## Implementation Details

The application implements three main tests:

### WebSocket Test
- Uses the Convex React client's built-in WebSocket connection
- Monitors connection state in real-time
- Displays detailed connection information

### HTTP Test
- Makes a simple GET request to a Convex HTTP endpoint (`/ping`)
- Shows success/failure status and response details

### SSE (Server-Sent Events) Test
- Establishes an EventSource connection to a Convex SSE endpoint (`/sse`)
- Receives streamed messages from the server
- Displays real-time updates

## Backend Endpoints

The application implements two HTTP endpoints in `convex/http.ts`:

1. `/ping` - A simple HTTP endpoint that returns a JSON response
2. `/sse` - An endpoint that streams data using the Server-Sent Events protocol

## Getting Started

To run this application locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Deploy to Convex (if needed)
npx convex deploy
```

## Environment Setup

This project requires a Convex deployment. The application automatically derives the site URL from the Convex URL provided in the environment variables.

## Technology Stack

- [Convex](https://convex.dev/) - Backend service (database, server logic, HTTP endpoints)
- [React](https://react.dev/) - Frontend UI framework
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
