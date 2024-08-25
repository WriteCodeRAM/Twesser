async function fetchNewQuestions(room, rooms) {
  try {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/questions`
        : "http://localhost:3000/api/questions";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usedIds: rooms[room].history }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    rooms[room].totalQuestions = data.totalQuestionsInDatabase;
    return data.questions;
  } catch (error) {
    console.error("Error in fetchNewQuestions:", error);
    throw error;
  }
}

module.exports = { fetchNewQuestions };
