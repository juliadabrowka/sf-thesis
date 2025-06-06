import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { SurveyDTO } from '../../../data-types';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sf-survey-table',
  imports: [NzTableModule],
  templateUrl: './survey-table.component.html',
  styleUrl: './survey-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyTableComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly sfSurveys = input<SurveyDTO[] | null | undefined>([]);
  public readonly columns = ['Nazwa ankiety', 'Nazwa wyprawy', 'Kraj wyprawy'];

  async goToSurvey(surveyId: number | undefined) {
    if (!surveyId) {
      throw new Error('No survey id but should be');
    }
    await this.router.navigate([surveyId], {
      relativeTo: this.activatedRoute,
    });
  }
}
