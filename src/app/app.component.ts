import { Component, inject } from '@angular/core';
import { SharedModule } from './shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { ProgressComponent } from './components/progress/progress.component';
import { DoneComponent } from './components/done/done.component';
import { QuizStore } from './store/quiz.store';

@Component({
    selector: 'app-root',
    imports: [SharedModule, ToolbarComponent, QuestionPresenterComponent, ProgressComponent, DoneComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    readonly store = inject(QuizStore);

    readonly questionsCount = this.store.questionsCount;
    readonly currentQuestion = this.store.currentQuestionIndex;
    readonly isDone = this.store.isQuizDone;

    /**
     * Resets the answers array in the store to an empty array.
     */
    resetQuiz(): void {
        this.store.resetAnswers();
    }

    /**
     * Generates a new quiz in the store.
     * This will reset the answers array in the store to an empty array and set the questions array to a new set of random questions.
     */
    generateNewQuiz(): void {
        this.store.generateNewQuiz();
    }
}
