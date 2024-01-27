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
	  const transcript = "Alex: Good morning, Jordan. It's Alex from GreenTech Ventures. How are you today?\nJordan: Good morning, Alex. I'm doing well, thank you. Excited to speak with you. How about yourself?\nAlex: I'm great, thank you. I appreciate you taking the time for this call. I've been following your startup's progress over the past few months, and I must say, your approach to green energy solutions is quite impressive.\nJordan: Thank you, Alex. We're really passionate about what we're doing here and the impact it could have on the environment and the energy sector.\nAlex: That's exactly what caught my eye. Can you tell me more about your current projects and how you envision your company's growth in the next few years?\nJordan: Absolutely. Our flagship project is a new type of solar panel that's not only more efficient than current models but also significantly cheaper to produce. We're in the final stages of R&D and about to start pilot installations. Over the next five years, we aim to scale production, expand our market reach, and invest in additional R&D to diversify our product line.\nAlex: That sounds promising. Efficiency and cost reduction are key in renewable energy technologies. What do you see as your biggest challenges in achieving these goals?\nJordan: Our main challenges are scaling our manufacturing capabilities and navigating the regulatory landscape, which can vary significantly by region. We're also aware of the competitive landscape and the need to continuously innovate to stay ahead.\nAlex: Understandable. Those are common hurdles for startups in this space. How do you plan to overcome these challenges?\nJordan: We're in the process of securing partnerships with manufacturing companies to address our production needs. As for regulation and competition, we have a dedicated team focusing on market research and compliance, ensuring we're not just meeting but exceeding industry standards.\nAlex: It sounds like you have a solid plan in place. Let's talk about financials for a moment. What kind of investment are you looking for, and how do you plan to utilize the funds?\nJordan: We're seeking an investment of $5 million to fund our pilot installations, scale manufacturing, and bolster our R&D efforts. This investment will also support our marketing strategies to ensure we reach our target markets effectively.\nAlex: That's a significant but reasonable ask given your objectives. I'm impressed by the thoughtfulness of your approach and the potential impact of your technology. I believe there could be a strong synergy between your vision and our investment philosophy at GreenTech Ventures.\nJordan: We're glad to hear that. We believe that with the right partners, we can make a significant impact on the industry and contribute to a more sustainable future.\nAlex: Absolutely. I'll need to discuss this with my team, but I'm optimistic about the possibilities. How soon are you looking to secure this investment?\nJordan: Ideally, within the next three months, so we can stay on track with our project timelines.\nAlex: Understood. Let me take this back to my team, and we'll follow up within the next week with next steps. How does that sound?\nJordan: That sounds perfect, Alex. Thank you for considering our startup for investment. I look forward to hearing from your team.\nAlex: Thank you, Jordan. It was a pleasure speaking with you, and I'm excited about the potential of working together. We'll be in touch soon. Have a great day.\nJordan: You too, Alex. Thank you again for the opportunity."

  
	  const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
		  prompt: "Analyze the following business meeting transcript and evaluate if it is a good investment opportunity. You should give a rating on 10 based on the information provided: " +transcript,
		}
	  );
  
	  return new Response(JSON.stringify(response));
	},
  };
