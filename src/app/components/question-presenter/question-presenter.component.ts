import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuizStore } from '../../store/quiz.store';

@Component({
    selector: 'app-question-presenter',
    imports: [SharedModule],
    templateUrl: './question-presenter.component.html',
    styleUrl: './question-presenter.component.scss',
})
export class QuestionPresenterComponent {
    readonly store = inject(QuizStore);
    readonly question = this.store.currentQuestion;

    /**
     * Dispatches an action to add the answer at the given index to the
     * answers array in the store.
     * @param index The index of the answer to add.
     */
    answerHandler(index: number): void {
        this.store.addAnswer(index);
    }
}
