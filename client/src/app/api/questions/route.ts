import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: Request) {
  const { usedIds } = await request.json();

  // Get total questions count
  const { count: totalQuestionsInDatabase } = await supabase
    .from("Questions")
    .select("*", { count: "exact", head: true });

  // Get count of available questions
  const { count: totalQuestions } = await supabase
    .from("Questions")
    .select("*", { count: "exact", head: true })
    .not("id", "in", `(${usedIds.join(",")})`);

  const take = 5;
  const skip = Math.max(
    0,
    Math.floor(Math.random() * (totalQuestions! - take)),
  );

  // Fetch questions
  const { data: questions, error } = await supabase
    .from("Questions")
    .select("*")
    .not("id", "in", `(${usedIds.join(",")})`)
    .order("id", { ascending: true })
    .range(skip, skip + take - 1);

  if (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    questions,
    totalQuestionsInDatabase,
  });
}
