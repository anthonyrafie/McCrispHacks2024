/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Ai } from '@cloudflare/ai'


export default {
  async fetch(request: { method: string; arrayBuffer: () => any; }, env: { AI: any; }) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return handleCors();
    }

    // Process only POST requests with audio data
    if (request.method === "POST") {
      const blob = await request.arrayBuffer();
      const ai = new Ai(env.AI);
      // Assuming you have set up Whisper AI with Cloudflare and `env.AI` is your configured AI environment variable

      try {
        const input = { audio: [...new Uint8Array(blob)] };
        const response = await ai.run("@cf/openai/whisper", input);

        // Adjust response parsing based on the actual Whisper AI response structure
        return new Response(JSON.stringify({ transcription: response }), {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*", // Adjust for production
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Return method not allowed for other request methods
    return new Response('Method Not Allowed', { status: 405 });
  },
};

function handleCors() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*", // Be more specific in production
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*", // Be more specific based on your needs
    }
  });
}
