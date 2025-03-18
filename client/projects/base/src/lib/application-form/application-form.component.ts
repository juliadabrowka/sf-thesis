import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'sf-application-form',
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NzFormDirective
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationFormComponent {

  public __controls = {
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    phone: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    extra: new FormControl('', {nonNullable: true}),
  }
  public readonly __formGroup = new FormGroup(this.__controls)

  submitForm() {

  }
}
