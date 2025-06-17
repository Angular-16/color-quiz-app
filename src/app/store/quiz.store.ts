import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';
import { addAnswerUpdater, generateNewQuizUpdater, resetAnswersUpdater } from './quiz.updater';
import { getCorrectAnswersCount } from './quiz.helper';

// @ts-ignore
export const QuizStore = signalStore(
    /** Настройки store */
    {
        /** Провайдим store в корневом модуле, по аналогии с сервисами */
        providedIn: 'root',
        /** Запрещает (true) или разрешает (false) изменять state извне при вызове patchState */
        protectedState: true, // default state is true
    },
    /** Функция добавляет state в store */
    withState(initialQuizSlice),
    /** Функция добавляет вычисляемые свойства в store */
    withComputed((store) => {
        const currentQuestionIndex = computed(() => store.answers().length);
        const isQuizDone = computed(() => store.answers().length === store.questions().length);
        const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
        /** Общее количество вопросов */
        const questionsCount = computed(() => store.questions().length);
        /** Количество правильных ответов */
        const correctAnswersCount = computed(() => getCorrectAnswersCount(store.answers(), store.questions()));

        return {
            currentQuestionIndex,
            isQuizDone,
            currentQuestion,
            questionsCount,
            correctAnswersCount,
        };
    }),
    /** Функция добавляет методы в store */
    withMethods((store) => ({
        addAnswer: (index: number) => patchState(store, addAnswerUpdater(index)),
        resetAnswers: () => patchState(store, resetAnswersUpdater()),
        generateNewQuiz: () => patchState(store, generateNewQuizUpdater()),
    }))
);
