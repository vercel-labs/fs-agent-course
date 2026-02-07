import { tool } from 'ai';
import { z } from 'zod';
import type { Sandbox } from '@vercel/sandbox';

export function createBashTool(sandbox: Sandbox) {
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
      const result = await sandbox.runCommand(command, args);
      const textResults = await result.stdout();
      const stderr = await result.stderr();
      return {
        stdout: textResults,
        stderr: stderr,
        exitCode: result.exitCode
      };
    }
  });
}
