import { useRef, useState } from 'react';
import { Alert, Box } from '@mui/material';
import QuestionCard from './components/QuestionCard';
import stringToColor from './helper';

interface Props {}

const ids = Array.from({ length: 8 }, (_, index) => index as number);

const colors = Object.fromEntries(ids.map((id) => [id, stringToColor(Math.random().toString())]));

const CreateTestPage: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<number[]>(ids);

  const draggingItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (position: number) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (position: number) => {
    dragOverItem.current = position;
    const questionsCopy = [...questions];
    const draggingItemContent = draggingItem.current ? questionsCopy[draggingItem.current] : -1;

    if (draggingItem.current) {
      questionsCopy.splice(draggingItem.current, 1);
    }
    questionsCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setQuestions(questionsCopy);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      {questions.map((id, index) => (
        <Alert
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            background: colors[id],
          }}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={(e) => e.preventDefault()}
        >
          {id}
        </Alert>
      ))}
      <QuestionCard />
    </Box>
  );
};

export default CreateTestPage;
