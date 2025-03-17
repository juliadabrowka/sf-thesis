import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SfActionBarComponent} from '../action-bar/action-bar.component';

@Component({
  selector: 'sf-main-page',
  imports: [
    SfActionBarComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfMainPageComponent {

}
