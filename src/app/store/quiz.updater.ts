import { PartialStateUpdater } from '@ngrx/signals';
import { QuizSlice } from './quiz.slice';
import { randomColorQuiz } from '../services/helpers';

/**
 * Adds an answer to the answers array in the state.
 * @param answer The answer to add.
 * @returns A partial state updater that adds the answer.
 */
export function addAnswerUpdater(answer: number): PartialStateUpdater<QuizSlice> {
    return (state: QuizSlice) => ({
        answers: [...state.answers, answer],
    });
}

/**
 * Resets the answers array in the state to an empty array.
 * @returns A partial state updater that resets the answers array.
 */
export function resetAnswersUpdater(): PartialStateUpdater<QuizSlice> {
    return (_) => ({
        answers: [],
    });
}

/**
 * Resets the answers array in the state to an empty array and generates a new
 * array of questions.
 * @returns A partial state updater that resets the answers array and generates
 * a new array of questions.
 */
export function generateNewQuizUpdater(): PartialStateUpdater<QuizSlice> {
    return (_) => ({
        answers: [],
        questions: randomColorQuiz(),
    });
}
