import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SfIconAndTextComponent } from '../../icon-and-text/icon-and-text.component';
import { SfIcons } from '../../icons';
import { SfSurveyComponent } from '../survey.component';

@Component({
  selector: 'sf-survey-modal',
  imports: [NzModalModule, SfIconAndTextComponent, SfSurveyComponent],
  templateUrl: './survey-modal.component.html',
  styleUrl: './survey-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfSurveyModalComponent {
  public readonly icons = SfIcons;
  public readonly visible = signal(false);

  openSurveyModal() {
    this.visible.set(true);
  }
}
