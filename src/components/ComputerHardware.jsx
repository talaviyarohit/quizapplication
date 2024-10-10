
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, ProgressBar } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';


const ComputerHardware = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Fetch questions from Firebase Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
        
        const querySnapshot = await getDocs(collection(db, 'ch'));
        const quizData = querySnapshot.docs.map((doc) => doc.data());
        console.log("ok",quizData);
      setQuestions(quizData);
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelection = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setAnswers([...answers, selectedAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setIsQuizFinished(true);
    }
  };

  const renderResults = () => (
    <div className="results">
      <h3>Your Score: {score} / {questions.length}</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <p>Question: {q.question}</p>
            <p>Your answer: <strong>{answers[index]}</strong></p>
            <p>Correct answer: <strong>{q.correctAnswer}</strong></p>
          </li>
        ))}
      </ul>
      <div className='link-name'>
                <Link to={'/'} className='link-link'>
                    Close
                </Link>
            </div>
    </div>
  );

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <Container className="quiz-page">
      {!isQuizFinished ? (
        <div>
          <ProgressBar 
            now={((currentQuestionIndex + 1) / questions.length) * 100}
            label={`${currentQuestionIndex + 1} / ${questions.length}`}
          />
          <h3>Question {currentQuestionIndex + 1}:</h3>
          <p>{questions[currentQuestionIndex].question}</p>
          <Form>
            {questions[currentQuestionIndex].option.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={option}
                value={option}
                checked={selectedAnswer === option}
                onChange={handleAnswerSelection}
              />
            ))}
          </Form>
          <Button
           className='btn-pr'
            variant="primary"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </div>
      ) : (
        renderResults()
      )}
    </Container>
  );
};

export default ComputerHardware;
