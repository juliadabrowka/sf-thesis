import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'sf-main-page-view',
  imports: [
    RouterOutlet
  ],
  templateUrl: './main-page-view.component.html',
  styleUrl: './main-page-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfBackofficeMainPageViewComponent {
}
