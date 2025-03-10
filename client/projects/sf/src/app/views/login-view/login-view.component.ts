import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'sf-login-view-view',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfBackofficeLoginViewComponent {

}
