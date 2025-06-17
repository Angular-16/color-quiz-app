import { Component, computed, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuizStore } from '../../store/quiz.store';

@Component({
    selector: 'app-done',
    imports: [SharedModule],
    templateUrl: './done.component.html',
    styleUrl: './done.component.scss',
})
export class DoneComponent {
    private readonly store = inject(QuizStore);

    readonly correctAnswers = this.store.correctAnswersCount;
    readonly totalQuestions = this.store.questionsCount;
    readonly score = computed(() => this.correctAnswers() / this.totalQuestions());
}
