import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SfLoginFormComponent} from '@sf/sf-base';

@Component({
  selector: 'sf-backoffice-login-view',
  imports: [
    ReactiveFormsModule,
    SfLoginFormComponent
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfBackofficeLoginComponent {

}
