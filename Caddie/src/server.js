import express from 'express';
import { exec } from 'child_process';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/run-ai-command', (req, res) => {
    // Example CLI command to access the AI API
    const command = 'npx wrangler dev --remote';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(stderr);
        }
        const result = JSON.parse(stdout); // Assuming the output is JSON
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
