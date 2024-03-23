import React, { useState, useEffect } from "react";

function QuestionList({ onDeleteQuestion, onUpdateCorrectAnswer }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdateCorrectAnswer = async (id, correctIndex) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? { ...question, correctIndex } : question
        )
      );
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  };

  return (
   <section>
    <h1>Quiz Questions</h1>
    <ul>
    {questions.map((question) => (
    <li key={question.id}>
    <h4>Question {question.id}</h4>
    <h5>Prompt: {question.prompt}</h5>
     <label>
     Correct Answer:
     <select
     value={question.correctIndex}
     onChange={(e) =>
     handleUpdateCorrectAnswer(question.id, parseInt(e.target.value))
    }
    >
     {question.answers.map((answer, index) => (
     <option key={index} value={index}>
     {answer}
     </option>
    ))}
     </select>
     </label>
     <button onClick={() => handleDelete(question.id)}>
     Delete Question
     </button>
     </li>
   ))}
    </ul>
    </section>
  );
}

export default QuestionList;