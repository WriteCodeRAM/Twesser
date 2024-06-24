import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const questions = await prisma.questions.findMany({
    take: 10,
  });
  console.log(questions);
  return NextResponse.json({
    questions,
  });
}
