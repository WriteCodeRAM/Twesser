async function fetchNewQuestions(room, rooms) {
  const response = await fetch("http://localhost:3000/api/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usedIds: rooms[room].history }),
  });
  const data = await response.json();
  return data.questions;
}

module.exports = { fetchNewQuestions };
