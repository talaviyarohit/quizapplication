import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';


const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  

 
  

  // Fetch quizzes from Firestore
  useEffect(() => {
    const fetchQuizzes = async () => {
      const querySnapshot = await getDocs(collection(db, 'quizzes'));
      const quizData = querySnapshot.docs.map((doc) => doc.data());
      setQuizzes(quizData);
    };
    fetchQuizzes();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Available Quizzes</h2>
      <Row>
      <Col  sm={12} md={6} lg={4} className="mb-4">
            <Card className="quiz-card">
              <Card.Body>
                <Card.Title className='title-name'>General Knowledge Quiz</Card.Title>
                <Card.Text className='test-name'>Test your knowledge of basic General Knowledge concepts!</Card.Text>
                {/* You can add a "Start Quiz" button or link here */}
                <div  className='link-name'>
                <Link to={'/quiz'} className='link-link'>
                  Start Test
                </Link>
                </div>
              </Card.Body>
           
            </Card>
          </Col>
      </Row>

      <Row  className='mt-t4'>
      <Col  sm={12} md={6} lg={4} className="mb-4">
            <Card className="quiz-card">
              <Card.Body>
                <Card.Title className='title-name'>Computer Hardware Quiz</Card.Title>
                <Card.Text className='test-name'>Test your knowledge of basic Computer Hardware concepts!</Card.Text>
                {/* You can add a "Start Quiz" button or link here */}
                <div className='link-name'>
                
                <Link to={'/computerhardware'}
                className='link-link'>
                  Start Test
                </Link>
                </div>
                
              </Card.Body>
           
            </Card>
          </Col>
      </Row>

      <Row className='mt-t4'>
      <Col  sm={12} md={6} lg={4} className="mb-4">
            <Card className="quiz-card">
              <Card.Body>
                <Card.Title className='title-name'>Computer Software Quiz</Card.Title>
                <Card.Text className='test-name'>Test your knowledge of basic Computer Softwareconcepts!</Card.Text>
                {/* You can add a "Start Quiz" button or link here */}
                <div className='link-name'>
                <Link to={'/computersoftware'} className='link-link'>
                  Start Test
                </Link>
                </div>
              </Card.Body>
           
            </Card>
          </Col>
      </Row>
    </Container>
  );
};

export default QuizList;
