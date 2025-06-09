import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import type { PersonData } from "@/types";

export async function POST(request:Request) {
 const { personA, personB } = (await request.json()) as {
  personA: PersonData;
  personB: PersonData;
 }
 const chat = new ChatOpenAI({
  temperature: 0.7,
  modelName: 'gpt-4o',
  openAIApiKey: process.env.OPENAI_API_KEY,
 });

 const systemMsg = new SystemMessage(
  "You are Inge, an empathetic AI relationship counselor."
 );
 const humanMsg = new HumanMessage(`
  Here are two user's profiles:
  Person A:
  Name: ${personA.name} (with person's pronouns as ${personA.pronouns}), Nationality:${personA.nationality}
  Traits: ${Object.entries(personA.traits)
    .map(([k,v]) => `${k}=${v}`)
    .join(", ")}
  Lifestyle: ${Object.entries(personB.lifestyle)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ")}

  Provide friendly, actionable advice based on their similarities and differences.
    `);
  const response = await chat.call([systemMsg, humanMsg]);
  return NextResponse.json({advice: response.text})
}