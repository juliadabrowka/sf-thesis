import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefaultStatusValue, TripApplicationDTO } from '@sf/sf-base';

@Component({
  selector: 'sf-application-form',
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NzFormDirective,
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormComponent {
  public readonly controls = {
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    extra: new FormControl('', { nonNullable: true }),
  };
  public readonly formGroup = new FormGroup(this.controls);
  public readonly sfClientData = output<TripApplicationDTO>();

  submitForm() {
    const clientData: TripApplicationDTO = {
      Id: undefined,
      Hash: undefined,
      Name: this.controls.name.value,
      Email: this.controls.email.value,
      PhoneNumber: this.controls.phone.value,
      ExtraInfo: this.controls.extra.value,
      Status: DefaultStatusValue,
      TripId: undefined,
      TripDTO: undefined,
      SurveyResponseId: undefined,
      SurveyResponseDTO: undefined,
    };
    this.sfClientData.emit(clientData);
  }
}
