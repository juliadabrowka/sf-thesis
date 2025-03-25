import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TripTermDTO} from '@sf/sf-base';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzDatePickerModule, NzRangePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';

@Component({
  selector: 'sf-trip-term-details',
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzRangePickerComponent,
    NzInputNumberComponent,
    ReactiveFormsModule,
    NzDatePickerModule
  ],
  templateUrl: './trip-term-details.component.html',
  styleUrl: './trip-term-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripTermDetailsComponent {
  public readonly sfTripTerm = input<TripTermDTO | undefined>(undefined);

  public readonly __controls = {
    dates: new FormControl<[Date, Date]>([new Date(), new Date()]),
    price: new FormControl<number>(0, {nonNullable: true}),
    participantsTotal: new FormControl<number>(0, {nonNullable: true}),
    participantsCurrent: new FormControl<number>(0, {nonNullable: true}),
  };
  public __formGroup = new FormGroup(this.__controls)

  constructor() {
    toObservable(this.sfTripTerm)
      .pipe(takeUntilDestroyed())
      .subscribe(tripTerm => {
        if (tripTerm) {
          this.__formGroup.patchValue({
            dates: [tripTerm.DateFrom, tripTerm.DateTo],
            price: tripTerm.Price,
            participantsCurrent: tripTerm.ParticipantsCurrent,
            participantsTotal: tripTerm.ParticipantsTotal
          })
        } else {
          this.__formGroup.patchValue({
            dates: [new Date(), new Date()],
            price: 0,
            participantsCurrent: 0,
            participantsTotal: 0
          })
        }
      })
  }
}
