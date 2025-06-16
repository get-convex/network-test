import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

// Create an HTTP router
const http = httpRouter();

// Simple GET endpoint for HTTP connection test
http.route({
  path: "/ping",
  method: "GET",
  handler: httpAction(async (_ctx, _request) => {
    return new Response(
      JSON.stringify({ status: "success", message: "Connection successful" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }),
});

// SSE endpoint for testing Server-Sent Events
http.route({
  path: "/sse",
  method: "GET",
  handler: httpAction(async (_ctx, _request) => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        controller.enqueue(
          encoder.encode("event: message\ndata: Connected to SSE\n\n"),
        );

        // Send a message every second for 10 seconds
        let count = 0;
        const interval = setInterval(() => {
          if (count >= 10) {
            // Send a final completion message before closing
            const finalMessage = `event: message\ndata: ${JSON.stringify({
              type: "complete",
              message: "Stream complete",
              totalMessages: count,
            })}\n\n`;
            controller.enqueue(encoder.encode(finalMessage));

            // Close the stream
            clearInterval(interval);
            controller.close();
            return;
          }

          const message = `event: message\ndata: ${JSON.stringify({
            count: count++,
            timestamp: Date.now(),
            type: "data",
          })}\n\n`;

          controller.enqueue(encoder.encode(message));
        }, 1000);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

export default http;

