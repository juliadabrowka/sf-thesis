import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SfLoginFormComponent} from '@sf/sf-base';

@Component({
  selector: 'sf-backoffice-login',
  imports: [
    ReactiveFormsModule,
    SfLoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class SfBackofficeLoginComponent {

}
