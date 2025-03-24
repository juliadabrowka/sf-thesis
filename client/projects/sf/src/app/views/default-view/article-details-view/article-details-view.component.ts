import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'sf-article-details-view',
  imports: [
    RouterOutlet
  ],
  templateUrl: './article-details-view.component.html',
  styleUrl: './article-details-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripDetailsViewComponent {

}
