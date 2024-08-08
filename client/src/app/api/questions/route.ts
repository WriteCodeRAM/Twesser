import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const totalQuestions = await prisma.questions.count();
  const take = 10;
  const skip = Math.max(0, Math.floor(Math.random() * (totalQuestions - take)));

  const questions = await prisma.questions.findMany({
    take,
    skip,
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json({
    questions,
  });
}
