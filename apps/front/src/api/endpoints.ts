export const getQuizz = () => (
  fetch('http://localhost:4000/quizz').then((response) => response.json())
)