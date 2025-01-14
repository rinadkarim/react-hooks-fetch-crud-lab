import { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          answers: formData.answers.filter((answer) => answer.trim() !== ""),
          correctIndex: parseInt(formData.correctIndex),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      const newQuestion = await response.json();
      onAddQuestion(newQuestion);
      setFormData({
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: 0,
      });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />

        <label>Answers:</label>
        {formData.answers.map((answer, index) => (
          <div key={index}>
            <label htmlFor={`answer-${index}`}>Answer {index + 1}</label>
            <input
              id={`answer-${index}`}
              name={`answer-${index}`}
              type="text"
              value={answer}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  answers: formData.answers.map((ans, idx) =>
                    idx === index ? event.target.value : ans
                  ),
                })
              }
            />
          </div>
        ))}

        <label htmlFor="correctIndex">Correct Answer:</label>
        <select
          id="correctIndex"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {formData.answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>

        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;


