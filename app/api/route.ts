import { agent } from '@/lib/agent';
import {
  UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse
} from 'ai';

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  // Extract the last user message as the prompt
  const lastMessage = messages[messages.length - 1];
  const prompt =
    lastMessage?.parts
      ?.filter(
        (part): part is { type: 'text'; text: string } => part.type === 'text'
      )
      .map((part) => part.text)
      .join('\n') || '';

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      async execute({ writer }) {
        try {
          const stream = await agent.stream({ prompt });
          writer.merge(stream.toUIMessageStream());
        } catch (error) {
          console.error('Agent error:', error);
          writer.write({
            type: 'text-start',
            id: 'error'
          });
          writer.write({
            type: 'text-delta',
            id: 'error',
            delta: 'An error occurred. Please try again.'
          });
          writer.write({
            type: 'text-end',
            id: 'error'
          });
        }
      }
    })
  });
}
