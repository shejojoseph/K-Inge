import { NextRequest, NextResponse } from "next/server";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage, SystemMessage, ChatMessage } from "@langchain/core/messages";
import type { PersonData } from "@/types";
// import { error } from "console";

export const runtime = 'edge'; // global distribution & ultra low latency. for faster cold starts. lightweight runtime.
console.log('OpenAI key loaded:',process.env.OPENAI_API_KEY?.startsWith("sk-"));
export async function POST(req:NextRequest) {
  // JSON check
  let body: any;
  try{

    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      { error: `Invalid JSON body: ${err}` },
      { status: 400 }
    );
  }
  // Payload check
  const { personA, personB, messages } = body as {
    personA: PersonData;
    personB: PersonData;
    messages: Array<{ role: 'user'|'assistant'; content: string}>
  };

  // OpenAI prompt
  const systemPrompt = new SystemMessage (`
  You are Inge, a to the point german AI relationship counsellor. You are direct and consise in your answers and crack a related joke in the end of each conversation.

  Person A: ${personA.name}, pronouns ${personA.pronouns}, nationality ${personA.nationality}.
  Traits: ${Object.entries(personA.traits).map(([k, v]) => `${k} = ${v}`).join(', ')}.
  Lifestyle: ${Object.entries(personA.lifestyle).map(([k, v]) => `${k} = ${v}`).join(',')}.

  Person B: ${personB.name}, pronouns ${personB.pronouns}, nationality ${personB.nationality}.
  Traits: ${Object.entries(personB.traits).map(([k, v]) => `${k} = ${v}`).join(', ')}.
  Lifestyle: ${Object.entries(personB.lifestyle).map(([k, v]) => `${k} = ${v}`).join(', ')}.
  `.trim());

  // save chat history
  const history = messages.map((m) => {
    if (m.role === 'user') return new HumanMessage(m.content);
    if (m.role === 'assistant') return new AIMessage(m.content);
    return new ChatMessage(m.content, m.role);
  });

  history.unshift(systemPrompt);

  // OpenAI setup
  try {
    const chat = new ChatOpenAI({
      temperature: 0.7,
      modelName: 'gpt-4o',
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const agent = createReactAgent({
      llm: chat,
      tools: [],
    });

    const eventStream = await agent.streamEvents(
      {messages: history },
      {version: 'v2'}
    );

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await( const { event, data } of eventStream) {
          if (event ==='on_chat_model_stream' && data.chunk.content) {
            controller.enqueue(encoder.encode(data.chunk.content));
          }
        } controller.close();
      },
    });

    return new Response(stream, {
      headers: {'Content-Type': 'text/plain; charset-utf-8'}
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Agent error';
    return NextResponse.json({error: message}, {status: 500});
  }


}