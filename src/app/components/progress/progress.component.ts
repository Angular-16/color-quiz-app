import { Component, computed, input } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'app-progress',
    imports: [SharedModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.scss',
})
export class ProgressComponent {
    readonly max = input.required<number>();
    readonly value = input.required<number>();
    readonly ratio = computed(() => this.value() / this.max());
}
