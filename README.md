# File System Agent

## What we'll build

A file system agent for analyzing call transcripts. This could be extended to:

- analyzing legal documents
- coding agents
- financial analysis
- SQL generation and execution

For this project we'll use:

- **Vercel Sandbox** - Secure, isolated environment for running untrusted code (bash commands)
- **AI SDK** - Unified API for building AI applications with streaming, tools, and agents
- **AI Gateway** - Routes requests to AI providers with automatic fallbacks, caching, and rate limiting

## Why use a sandbox?

When building AI agents that execute code, you're essentially letting an LLM run arbitrary commands on your system. This introduces significant security risks:

- **Unpredictable outputs**: LLMs can hallucinate or generate malformed commands that behave unexpectedly
- **Prompt injection**: Malicious user input could trick the agent into running harmful commands like `rm -rf /` or accessing sensitive files
- **Resource exhaustion**: An infinite loop or memory-intensive command could crash your server
- **Data exfiltration**: Without isolation, the agent could read environment variables, credentials, or private data

A sandbox provides an isolated execution environment that protects your host system. With Vercel Sandbox:

- Commands run in a separate container with no access to your actual filesystem
- Network access can be restricted
- Resource limits prevent runaway processes
- Even if the LLM generates dangerous commands, they can't affect your production environment

This means you can safely give your agent powerful tools like bash execution without worrying about what happens if something goes wrong.

## Repository Overview

The starter repo comes with all necessary files pre-created.

**Existing files:**

- `app/form.tsx` - A component that accepts a user query and sends to an API route, then renders the stream as it's returned
- `app/api/route.ts` - A route handler that calls the agent and streams back to the UI
- `lib/calls/` - A directory with pre-loaded dummy call transcripts

**Files we will edit in this tutorial:**

- `lib/agent.ts` - Where we will define the agent
- `lib/tools.ts` - Where we will define the bash tool for our agent to use

The `final` branch of the repo is the completed code if you need to reference.

## Prerequisites

For this project, you'll need:

- [Node.js](https://nodejs.org/) 18+ installed
- [pnpm](https://pnpm.io/) package manager
- Vercel account
- [Vercel CLI](https://vercel.com/docs/cli)
- [AI Gateway API Key](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys&title=AI+Gateway+API+Keys)

## Getting started

Clone this starter repository.

Using the Vercel CLI, create a new project and link it to your local repository.

`vc link`

You'll be prompted with a few questions:

```
Set up “~/filesystem-agent”? yes
? Which scope should contain your project? your-vercel-team
? Link to existing project? no
? What’s your project’s name? filesystem-agent
? In which directory is your code located? ./
```

Once the project is created in Vercel, pull the automatically created environment variables to use locally. This handles [OIDC token authentication](https://vercel.com/docs/vercel-sandbox/concepts/authentication#vercel-oidc-token-recommended) automatically in your project.

`vc env pull`

You can now inspect the OIDC token in `.env.local` in your project.

Add your AI Gateway API Key to `.env.local`:

```
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

## Building the agent

In `lib/agent.ts`, define the initial agent instance using the `ToolLoopAgent` class from the AI SDK. We'll use Opus 4.6 as the default model, but you can change to [any other](https://vercel.com/ai-gateway/models). As it stands, the agent has no tools and no instructions yet.

```ts
// lib/agent.ts
import { ToolLoopAgent } from 'ai';

const MODEL = 'anthropic/claude-opus-4.6';

export const agent = new ToolLoopAgent({
  model: MODEL,
  instructions: '',
  tools: {}
});
```

### Creating a bash tool

Let's start by defining the tools that the agent has access to. Since we're building a file system agent, we need to instruct the agent on how to use bash to navigate. We'll do this by defining a new tool in `lib/tools.ts`. We can create a function that returns a tool from the AI SDK.

```ts
// lib/tools.ts
import { tool } from 'ai';
import { z } from 'zod';

export function createBashTool() {
  return tool({
    description: `
      Execute bash commands to explore transcript and instruction files.
      Examples (not exhaustive): ls, cat, less, head, tail, grep
      `,
    inputSchema: z.object({
      command: z.string().describe('The bash command to execute'),
      args: z.array(z.string()).describe('Arguments to pass to the command')
    }),
    execute: async ({ command, args }) => {
      // code that executes when the tool is called
    }
  });
}
```

As it stands, this function returns a tool to execute bash commands to explore files, but it doesn't actually execute any code. Via a Zod schema, we are also informing the agent that it needs to generate a command and arguments to pass to this tool. But as you can see, the execute callback function is empty. To actually execute the bash that the LLM is generating, we need to give it a safe execution environment. This is where sandbox comes in.

To allow a sandbox instance to be passed in, lets update the function declaration so that it expects a sandbox as a parameter:

```ts
import type { Sandbox } from '@vercel/sandbox';

export function createBashTool(sandbox: Sandbox) {
  // ...
}
```

### Define what the tool does

The next thing we'll do is pass the commands and args to the sandbox to execute:

```ts
execute: async ({ command, args }) => {
  const result = await sandbox.runCommand(command, args);
  const textResults = await result.stdout();
  const stderr = await result.stderr();
  return {
    stdout: textResults,
    stderr: stderr,
    exitCode: result.exitCode,
  };
},
```

Using the `runCommand` method on `sandbox`, we run the generated command and await the standard output, error output, and exit status of the process.

Now we're almost ready to give this tool to our agent to use. But first, we need to initialize the sandbox in the agent so we can pass it to the `createBashTool` function.

### Init the sandbox

In `agent.ts`, initialize the sandbox above the agent definition.

```ts
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();
```

We can now pass this sandbox to the `createBashTool` function to create the tool in the agent.

```ts
import { createBashTool } from './tools';

const agent = new ToolLoopAgent({
  // ...
  tools: {
    bashTool: createBashTool(sandbox)
  }
});
```

The agent now has access to the bash tool, but there are no files mounted to the sandbox for the agent to explore. We need to load files into the sandbox before we run the agent.

### Writing files to the sandbox

In this project, we have 3 dummy call transcripts in the `lib/calls` directory that we want to load as context to the sandbox before asking our agent a question.

Let's create a function called `loadSandboxFiles` in `agent.ts` that we can call to load these files into the sandbox.

```ts
import path from 'path';
import fs from 'fs/promises';

async function loadSandboxFiles(sandbox: Sandbox) {
  const callsDir = path.join(process.cwd(), 'lib', 'calls');
  const callFiles = await fs.readdir(callsDir);

  for (const file of callFiles) {
    const filePath = path.join(callsDir, file);
    const buffer = await fs.readFile(filePath);
    await sandbox.writeFiles([{ path: `calls/${file}`, content: buffer }]);
  }
}
```

What this function does is build the full path of the `calls` folder (in the same `lib` directory as `agent.ts`). Then it reads all filenames in that folder, loads each file as a buffer, and writes them to the sandbox's file system.

Be sure to call the function before the agent is created:

```ts
await loadSandboxFiles(sandbox);
```

### Agent instructions

Now that we have everything wired up, let's write clear instructions for the agent. We want it to use the bash tool to generate and execute commands to explore all the call transcripts to answer the user's questions.

```ts
const INSTRUCTIONS = `
You are a helpful assistant that answers questions about customer calls. Use bashTool to explore the files and find relevant information pertaining to the user's query. Using the information you find, craft a response for the user and output it as text.
`;
```

Add the `INSTRUCTIONS` to the agent:

```ts
const agent = new ToolLoopAgent({
  instructions: INSTRUCTIONS
  // ...
});
```

### Complete agent.ts

Here's the complete `lib/agent.ts` file with all the pieces together:

```ts
// lib/agent.ts
import { ToolLoopAgent } from 'ai';
import { Sandbox } from '@vercel/sandbox';
import { createBashTool } from './tools';
import fs from 'fs/promises';
import path from 'path';

const INSTRUCTIONS = `
You are a helpful assistant that answers questions about customer calls. Use bashTool to explore the files and find relevant information pertaining to the user's query. Using the information you find, craft a response for the user and output it as text.
`;

const MODEL = 'anthropic/claude-opus-4.6';

const sandbox = await Sandbox.create();
await loadSandboxFiles(sandbox);

export const agent = new ToolLoopAgent({
  model: MODEL,
  instructions: INSTRUCTIONS,
  tools: {
    bashTool: createBashTool(sandbox)
  }
});

async function loadSandboxFiles(sandbox: Sandbox) {
  const callsDir = path.join(process.cwd(), 'lib', 'calls');
  const callFiles = await fs.readdir(callsDir);

  for (const file of callFiles) {
    const filePath = path.join(callsDir, file);
    const buffer = await fs.readFile(filePath);
    await sandbox.writeFiles([{ path: `calls/${file}`, content: buffer }]);
  }
}
```

And the agent is complete! We're ready to test it. As noted, there is already a chat input and API route created to kick off the agent and stream back the results.

### Testing our agent

Start the development server with `pnpm dev` and go to `http://localhost:3000` in the browser to test the agent.

Ask it a question like `how did the deal progress?` or `did they mention pricing?` and see the agent work its magic by navigating the filesystem!

## Extending this app

Here are some ways to build on this project:

### Add more tools

Give the agent additional capabilities:

- **File upload tool** - Let users upload documents dynamically instead of pre-loading them
- **Search tool** - Add semantic search over documents using embeddings
- **Write tool** - Allow the agent to create summaries or reports and save them

### Improve the data pipeline

- Load files from cloud storage (S3, Vercel Blob) instead of the local filesystem
- Connect to a database to query structured data alongside the transcripts
- Add a tool that fetches files on-demand rather than pre-loading everything

### Enhance the UI

- Add chat history persistence with a database
- Show a file tree of what's available in the sandbox
- Add authentication to restrict access

### Use bash-tool

The [`bash-tool`](https://github.com/vercel-labs/bash-tool) package abstracts the complexity of writing and reading files from the filesystem and integrates seamlessly with Vercel Sandbox and the AI SDK.
