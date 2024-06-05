import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import StartLayout from '../components/layouts/StartLayout';
import ExamQuestionCard from '../components/items/ExamQuestionCard';
import Timer from '../components/UI/Timer';
import { Question, StudentAnswer } from './questions';
import log from './log';
import { center } from '../styles/flex';
import Routes from '../services/Router/Routes';
import studentExamSocket, { MessageNames } from '../store/examSocket';

const QuizPage: React.FC = () => {
  const [currQuestion, setCurrQuestion] = useState<Question | null>(null);
  const { testInfo } = studentExamSocket;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  studentExamSocket.on(MessageNames.QUESTION, (newQuestion: Question) => {
    setCurrQuestion(newQuestion);
    setIsLoading(false);
  });
  studentExamSocket.on(MessageNames.EXAM_FINISHED, () => {
    log('finished')();
    setIsLoading(false);
    navigate(Routes.JOIN);
  });

  return (
    <StartLayout header={false}>
      {isLoading || currQuestion === null ? (
        <div css={{ width: '120px', height: '120px', ...center }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Timer question={currQuestion} onEnd={() => setIsLoading(true)} />
          <ExamQuestionCard
            questionsAmount={testInfo?.questionsAmount}
            question={currQuestion}
            onAnswer={(answers: StudentAnswer[]) => {
              studentExamSocket.sendAnswer(currQuestion!.id, answers);
            }}
          />
        </>
      )}
    </StartLayout>
  );
};

export default QuizPage;
