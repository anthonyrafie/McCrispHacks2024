import { Ai } from "@cloudflare/ai"

export interface Env {
	AI: any;
}

export default {
	async fetch(request: Request, env: Env) {
	
		///////////// WAV TO TRANSCRIPT (YUJ AND ALLY'S PART)
		const res: any = await fetch("https://github.com/anthonyrafie/McCrispHacks2024/raw/zoom-transcript/recordings/Recording.wav");
		
		const blob = await res.arrayBuffer();

		const ai = new Ai(env.AI);
		const input = {
		audio: [...new Uint8Array(blob)],
		};

		const transcript_answer = await ai.run("@cf/openai/whisper", input);

		//const transcript_json = Response.json({ input: { audio: [] }, transcript_answer });

		const transcript = JSON.stringify(transcript_answer);


		///////////// TRANSCRIPT TO RESPONSE (ALEX AND RAFIE'S PART)
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



