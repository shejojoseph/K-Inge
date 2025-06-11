import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PersonData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { personA, personB } = (await req.json()) as {
      personA: PersonData;
      personB: PersonData;
    };

    const [a, b] = await Promise.all([
      prisma.profile.create({data: {...personA }}),
      prisma.profile.create({data: {...personB }}),
    ]);

    return NextResponse.json({ personA: a, personB: b}, {status: 201});
  } catch (err: any) {
    return NextResponse.json({ error: err.message}, {status: 500});
  }

}