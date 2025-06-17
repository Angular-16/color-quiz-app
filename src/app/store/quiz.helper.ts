import { Question } from '../models/question.model';

/**
 * Given an array of user answers and an array of questions,
 * returns the number of correct answers by the user.
 * @param userAnswers The array of answers given by the user.
 * @param questions The array of questions in the quiz.
 * @returns The number of correct answers.
 */
export function getCorrectAnswersCount(userAnswers: number[], questions: Question[]): number {
    return userAnswers.reduce((acc, answer, index) => {
        return acc + (questions.length > index && answer === questions[index].correctIndex ? 1 : 0);
    }, 0);
}
