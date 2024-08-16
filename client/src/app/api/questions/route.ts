import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { usedIds } = await request.json();

  const totalQuestions = await prisma.questions.count({
    where: {
      id: {
        notIn: usedIds,
      },
    },
  });

  const take = 10;
  const skip = Math.max(0, Math.floor(Math.random() * (totalQuestions - take)));

  const questions = await prisma.questions.findMany({
    where: {
      id: {
        notIn: usedIds,
      },
    },
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
