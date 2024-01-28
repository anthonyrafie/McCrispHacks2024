import { Octokit } from "@octokit/rest";
import { readFileSync } from "node:fs";


// Initialize a new Octokit instance
const octokit = new Octokit({ auth: `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` });

// Read the file's content
const content = readFileSync('/Recording.wav', 'utf8');

// Create a new file in the repository
octokit.repos.createOrUpdateFileContents({
    owner: 'anthonyrafie',
    repo: 'McCrispHacks2024',
    path: '/tree/zoom-transcript',
    message: 'commit',
    content: Buffer.from(content).toString('base64'),
    // branch: 'branch-name' // optional
});
