import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SurveyCreatorModel } from 'survey-creator-core';
import { SurveyCreatorModule } from 'survey-creator-angular';

@Component({
  selector: 'sf-survey',
  imports: [SurveyCreatorModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfSurveyComponent implements OnInit {
  surveyModel!: SurveyCreatorModel | undefined;

  ngOnInit(): void {
    const surveyJson = {
      title: 'Customer Feedback',
      pages: [
        {
          elements: [
            { type: 'text', name: 'name', title: 'Your name:' },
            { type: 'rating', name: 'satisfaction', title: 'Rate us:' },
          ],
        },
      ],
    };

    this.surveyModel = new SurveyCreatorModel();

    // this.surveyModel.onComplete.add((sender) => {
    //   console.log('Survey submitted:', sender.data);
    //   // call your .NET API to save final answers
    // });
    //
    // this.surveyModel.onValueChanged.add((sender) => {
    //   console.log('Auto-saving answer:', sender.data);
    //   // call your .NET API to save draft answers
    // });
  }
}
