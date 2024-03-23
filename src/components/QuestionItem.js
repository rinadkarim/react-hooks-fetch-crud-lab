import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
 const handleDelete = async () => {
  try {
  await fetch(`http://localhost:4000/questions/${question.id}`, {
  method: "DELETE",
 });
  onDeleteQuestion(question.id);
  } catch (error) {
  console.error("Error deleting question:", error);
  }
};

  const handleUpdateCorrectAnswer = async (correctIndex) => {
   try {
   await fetch(`http://localhost:4000/questions/${question.id}`, {
   method: "PATCH",
   headers: {
   "Content-Type": "application/json",
  },
   body: JSON.stringify({ correctIndex }),
   });
   onUpdateCorrectAnswer(question.id, correctIndex);
   } catch (error) {
   console.error("Error updating correct answer:", error);
  }
 };

  return (
   <li>
    <h4>Question {question.id}</h4>
    <h5>Prompt: {question.prompt}</h5>
    <label>
     Correct Answer:
    <select
     value={question.correctIndex}
     onChange={(e) => handleUpdateCorrectAnswer(parseInt(e.target.value))}
    >
   {question.answers.map((answer, index) => (
    <option key={index} value={index}>
     {answer}
    </option>
  ))}
 </select>
 </label>
 <button onClick={handleDelete}>Delete Question</button>
  </li>
 );
}

export default QuestionItem;