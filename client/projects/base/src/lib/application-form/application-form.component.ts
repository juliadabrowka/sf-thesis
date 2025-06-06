import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DefaultStatusValue, TripApplicationDTO } from '@sf/sf-base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
      validators: [Validators.email, Validators.required],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.phoneNumberValidator()],
    }),
    extra: new FormControl('', { nonNullable: true }),
  };
  public readonly formGroup = new FormGroup(this.controls);
  public readonly sfClientData = output<TripApplicationDTO>();
  public readonly sfButtonDisabled = output<boolean>();

  constructor() {
    this.formGroup.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.sfButtonDisabled.emit(
        this.formGroup.invalid || this.formGroup.pending,
      );
    });
  }

  submitForm() {
    const clientData: TripApplicationDTO = {
      Id: undefined,
      Hash: undefined,
      Name: this.controls.name.value,
      Email: this.controls.email.value,
      PhoneNumber: this.controls.phone.value,
      ExtraInfo: this.controls.extra.value,
      Status: DefaultStatusValue,
      SourceOfInformation: undefined,
      TripId: undefined,
      TripDTO: undefined,
      SurveyResponseId: undefined,
      SurveyResponseDTO: undefined,
    };
    this.sfClientData.emit(clientData);
    this.formGroup.reset();
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;

      const regex = /^\+?[1-9]\d{7,14}$/;

      return regex.test(phoneNumber)
        ? null
        : {
            invalidPhone: true,
          };
    };
  }
}
