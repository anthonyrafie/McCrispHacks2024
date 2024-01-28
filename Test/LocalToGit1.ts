import { Ai } from "@cloudflare/ai";

export interface Env {
	AI: any;
}

interface GitHubFile {
	name: string;
	download_url: string;
	// Add other properties as needed
  }
  
export default {
async fetch(request: Request, env: Env) {
	const repoUrl = "https://api.github.com/repos/anthonyrafie/McCrispHacks2024/recordings/";

	// Function to check if a file has a WAV extension
	function hasExtension(fileName: string, extension: string): boolean {
		return fileName.endsWith(`.${extension}`);
	}

	function filterFilesByExtension(files: GitHubFile[], extension: string): GitHubFile[] {
		return files.filter(file => hasExtension(file.name, extension));
	  }
	  
	
	// Fetch the list of files in the repository
	const res = await fetch(repoUrl);
	const directoryContents : GitHubFile[] = await res.json();

	// Filter out only WAV files
	const wavFiles = filterFilesByExtension(directoryContents, 'wav');

	// Array to store file data
    const fileDataArray: Uint8Array[] = [];

    // Fetch each file in the directory
    for (const file of wavFiles) {
		const fileUrl = file.download_url;
		const fileRes = await fetch(fileUrl);
		const blob = await fileRes.arrayBuffer();
		fileDataArray.push(new Uint8Array(blob));
	}

    const numericFileDataArray: number[] = fileDataArray.map(data => {
		// Convert binary data to a string if needed
		// Example: return new TextDecoder().decode(data);
		return NaN; // Modify this conversion based on your use case
	});

	// converting step (from audio to text)
	const ai = new Ai(env.AI);
    const input = {
      audio: numericFileDataArray, // Array of strings for each file
    };

    const response = await ai.run("@cf/openai/whisper", input);

    return Response.json({ input: { audio: [] }, response });
  }
}

