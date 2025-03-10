import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SfActionBarComponent} from '@sf/sf-base';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'sf-default-view',
  imports: [
    SfActionBarComponent,
    RouterOutlet
  ],
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfBackofficeDefaultViewComponent {

}
