import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { initialQuizSlice, QuizSlice } from './quiz.slice';
import { computed, effect, inject } from '@angular/core';
import { addAnswerUpdater, generateNewQuizUpdater, resetAnswersUpdater } from './quiz.updater';
import { getCorrectAnswersCount } from './quiz.helper';
import { LocalStorageService } from '../services/local-storage.service';

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
    })),
    /** Функция добавляет хуки в store */
    withHooks((store) => ({
        onInit: () => {
            const localStorageService = inject(LocalStorageService);
            const STORAGE_KEY = 'quizState';

            // Загрузка состояния
            const savedState = localStorageService.getItem<QuizSlice>(STORAGE_KEY);
            if (savedState) {
                patchState(store, savedState);
            }

            // Автосохранение при изменениях
            effect(() => {
                const state = getState(store);
                localStorageService.setItem(STORAGE_KEY, state);
            });
        },
        onDestroy() {
            // Очистка при необходимости
        },
    }))
);
