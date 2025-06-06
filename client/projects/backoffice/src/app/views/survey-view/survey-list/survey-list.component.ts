import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import {
  SfIconAndTextComponent,
  SfIcons,
  SurveyStore,
  SurveyTableComponent,
} from '@sf/sf-base';

@Component({
  selector: 'sf-backoffice-survey-list',
  imports: [NzCardComponent, SfIconAndTextComponent, SurveyTableComponent],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SurveyStore],
})
export class SfBackofficeSurveyListComponent {
  private readonly surveyStore = inject(SurveyStore);

  public readonly icons = SfIcons;
  public readonly surveys = computed(() => this.surveyStore.surveys());
}
