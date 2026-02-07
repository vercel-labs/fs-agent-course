'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export function Form() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api' })
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput('');
    sendMessage({ text });
  };

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-2xl">
        <div className="mb-6 space-y-4 font-mono text-sm">
          {messages.map((message) => (
            <div key={message.id} className="space-y-1">
              <div className="text-xs font-bold uppercase">{message.role}</div>
              {message.parts.map((part, i) => {
                if (part.type === 'text') {
                  return (
                    <div key={i} className="whitespace-pre-wrap">
                      {part.text}
                    </div>
                  );
                }
                if (part.type.startsWith('tool-')) {
                  const toolPart = part as {
                    type: string;
                    toolCallId: string;
                    toolName?: string;
                    state?: string;
                    input?: { command?: string; args?: string[] };
                    output?: {
                      stdout?: string;
                      stderr?: string;
                      exitCode?: number;
                    };
                  };
                  // Extract tool name from type (e.g., "tool-bashTool" -> "bashTool")
                  const toolName =
                    toolPart.toolName || toolPart.type.replace('tool-', '');

                  // Format the bash command
                  const bashCommand = toolPart.input
                    ? `${toolPart.input.command || ''} ${(
                        toolPart.input.args || []
                      ).join(' ')}`.trim()
                    : '';

                  return (
                    <div
                      key={i}
                      className="text-blue-600 dark:text-blue-400 space-y-1"
                    >
                      <div>
                        [{toolName}]{' '}
                        {bashCommand && (
                          <code className="px-1">$ {bashCommand}</code>
                        )}
                      </div>
                      {toolPart.state === 'output-available' &&
                        toolPart.output !== undefined && (
                          <pre className="text-xs text-green-600 p-2 overflow-x-auto">
                            {toolPart.output.stdout ||
                              toolPart.output.stderr ||
                              '(no output)'}
                          </pre>
                        )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}

          {status === 'streaming' && (
            <div className="text-xs text-zinc-400">streaming...</div>
          )}
        </div>

        {messages.length === 0 && (
          <form onSubmit={handleSubmit} className="flex gap-2 font-mono">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 border px-4 py-2"
            />
            <button
              type="submit"
              disabled={status === 'streaming'}
              className="bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
