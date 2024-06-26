const enum ErrorMessage {
  EXAM_NOT_FOUND = 'Exam not found. Please, check the exam code',
  STUDENT_ID_INCORRECT = 'Student not found. Please, check the student id',
  INVALID_STUDENT_TOKEN = 'Student token is required or invalid, if you provided studentId ',
  NOT_AUTHOR = 'You are not an author of this exam',
  EXAM_WAS_DELETED = 'The exam was deleted by the author or it has been deleted due to inactivity',
}

export default ErrorMessage;
