"use client";

import { ConvexReactClient, useConvex } from "convex/react";
import { ConvexProvider } from "convex/react";
import { useEffect, useState } from "react";
import { ConnectionState } from "convex/browser";

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-light dark:bg-dark p-4 border-b-2 border-slate-200 dark:border-slate-800">
        Convex + React
      </header>
      <main className="p-8 flex flex-col gap-16">
        <h1 className="text-4xl font-bold text-center">Convex + React</h1>
        <Content />
      </main>
    </>
  );
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function WebSocketTest() {
  return (
    <ConvexProvider client={convex}>
      <WebSocketTestInner />
    </ConvexProvider>
  );
}

function WebSocketTestInner() {
  const [status, setStatus] = useState<ConnectionState>();
  const convex = useConvex();
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(convex.connectionState());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [convex]);

  if (status === undefined) {
    return "checking...";
  }

  return (
    <div>
      <details>
        <summary>
          WebSocket connected: {`${status.isWebSocketConnected}`}
        </summary>
        Connection state:
        <code>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </code>
      </details>
    </div>
  );
}

function Content() {
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <WebSocketTest />
    </div>
  );
}
