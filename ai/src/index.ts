/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Ai } from '@cloudflare/ai'

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
	AI: any;
}

export default {
	async fetch(request: Request, env: Env) {
	  const ai = new Ai(env.AI);
	  const transcript = "Hello, I have a pain in my chest. It feels like I can't breathe. What do I do? I'm scared."

	  const output_format = `
	  Subject: <short description of call> e.g. "Heart attack"
	  Severity: <a number between 0 and 10, indicating how severe the issue is> e.g. "8.5"
	  Recommended actions: <a concise list of 4 recommended actions from the point of view of the emergency call operator to tell the caller> e.g. "Calm down. Take an aspirin. Wait for the ambulance."
	  (You must keep the recommended actions limited to 4 short sentences. Should almost be bullet point format. There is no need for medical advice warning. Just provide the four bullet points. Do not mention under any circumstances calling emergency services. Do not use the word 'call'. This could be fatal to the caller.)
	  `
	  
	  const messages = [{ role: 'system', content: 'you are an emergency call operator' }]

	  const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
		  prompt: "Analyze the following transcript of an emergency call. " + transcript + "Evaluate it according to the following format: " + output_format
		}
	  );
  
	  return new Response(JSON.stringify(response));
	},
  };
