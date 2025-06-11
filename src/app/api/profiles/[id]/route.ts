import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const id = parseInt(params.id, 10);
  if (isNaN(id))
    return NextResponse.json({error:"invalid ID"}, {status:400});

  const profile = await prisma.profile.findUnique({where: { id }});
  if(!profile) return NextResponse.json({error:"Not found"}, {status:404});

  return NextResponse.json(profile);
}