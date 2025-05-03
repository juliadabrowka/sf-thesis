import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import {
  SfIconAndTextComponent,
  SfIcons,
  SurveyDTO,
  SurveyStore,
  SurveyTableComponent,
} from '@sf/sf-base';

@Component({
  selector: 'sf-backoffice-survey-list',
  imports: [NzCardComponent, SfIconAndTextComponent, SurveyTableComponent],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfBackofficeSurveyListComponent {
  private readonly surveyStore = inject(SurveyStore);

  public readonly icons = SfIcons;
  public readonly surveys = signal<SurveyDTO[]>([]);

  constructor() {
    effect(() => {
      const surveys = this.surveyStore.surveys();
      this.surveys.set(surveys);
    });
  }
}
