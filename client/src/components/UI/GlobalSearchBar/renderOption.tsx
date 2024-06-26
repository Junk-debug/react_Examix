import { HTMLAttributes } from 'react';
import QuizIcon from '@mui/icons-material/Quiz';
import BookIcon from '@mui/icons-material/Book';
import HelpIcon from '@mui/icons-material/Help';
import { To } from 'react-router';
import { GlobalSearchResult } from '../../../services/Api/types/global-search';
import LinkListOption from '../LinkListOption';
import { trim } from '../../../utils/trim';
import prettifyDate from '../../../utils/time/prettifyDate';
import SubjectItem from '../SubjectItem/SubjectItem';
import Routes from '../../../services/Router/Routes';
import { Question } from '../../../types/api/entities/question';
import underscoreToUpperToSentence from '../../../utils/underscoreToUpperToSentence';

export const getOptionLabel = (result: GlobalSearchResult | string) => {
  if (typeof result === 'string') {
    return result;
  }

  return `${result.type}-${result.item.id}`;
};

export const getTitle = (result: GlobalSearchResult) => {
  switch (result.type) {
    case 'exam':
      return `Exam for ${result.item.test.name}`;
    case 'question':
      return result.item.title;
    case 'test':
      return result.item.name;
    default:
      throw new Error('Unknown option label type');
  }
};

export const getSubtitle = (result: GlobalSearchResult) => {
  switch (result.type) {
    case 'exam': {
      const dateStr = prettifyDate(result.item.createdAt);
      const students = result.item.results.map((student) => student.studentName).join(', ');

      return `Created at ${dateStr}. Students: ${students}`;
    }
    case 'question': {
      const type = underscoreToUpperToSentence(result.item.type);
      return <SubjectItem subject={result.item.subject} endText={`Type: ${type}.`} />;
    }
    case 'test': {
      return (
        <SubjectItem
          subject={result.item.subject}
          endText={`Description: ${result.item.description}.`}
        />
      );
    }
    default:
      throw new Error('Unknown option label type');
  }
};

export const getIcon = (result: GlobalSearchResult) => {
  switch (result.type) {
    case 'exam':
      return <BookIcon />;
    case 'question':
      return <HelpIcon />;
    case 'test':
      return <QuizIcon />;
    default:
      throw new Error('Unknown option label type');
  }
};

type ReturnType = ['to', To] | ['question', Question];

export const getAction = (result: GlobalSearchResult): ReturnType => {
  switch (result.type) {
    case 'exam':
      return ['to', `${Routes.EXAM}/${result.item.id}`];
    case 'question':
      return ['question', result.item];
    case 'test':
      return ['to', `${Routes.TEST}/${result.item.id}`];
    default:
      throw new Error('Unknown option label type');
  }
};

export const renderOption = (props: HTMLAttributes<HTMLLIElement>, result: GlobalSearchResult) => {
  const [actionName, payload] = getAction(result);
  const subtitleElement = getSubtitle(result);
  const subtitleIsString = typeof subtitleElement === 'string';
  const subtitle = subtitleIsString ? trim(subtitleElement, 66) : subtitleElement;
  const to = actionName === 'question' ? {} : payload;

  return (
    <LinkListOption
      title={trim(getTitle(result), 60)}
      subtitle={subtitle}
      icon={getIcon(result)}
      to={to}
      navigateOptions={actionName === 'question' ? { state: { question: payload } } : undefined}
      style={{ padding: '0' }}
      {...props}
    />
  );
};
