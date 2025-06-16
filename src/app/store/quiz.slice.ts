import { Question } from '../models/question.model';
import { QUESTIONS } from '../data/questions';

export interface QuizSlice {
    readonly questions: Question[];
    readonly answers: number[];
}

export const initialQuizSlice: QuizSlice = {
    answers: [],
    questions: QUESTIONS,
};
