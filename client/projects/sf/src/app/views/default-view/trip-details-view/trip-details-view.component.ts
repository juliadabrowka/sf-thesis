import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'sf-trip-details-view',
  imports: [
    RouterOutlet
  ],
  templateUrl: './trip-details-view.component.html',
  styleUrl: './trip-details-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripDetailsViewComponent {

}
