import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// make sure whatever questions retrieved arent repeats
//create history for rooms
// filter by ids
//findMany() gets all records so maybe do that and then use a loop to populate the new question pool to make sure
export async function GET() {
  const questions = await prisma.questions.findMany({
    take: 10,
  });
  console.log(questions);
  return NextResponse.json({
    questions,
  });
}
