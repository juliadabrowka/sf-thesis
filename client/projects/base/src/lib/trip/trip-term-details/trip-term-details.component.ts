import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SfButtonComponent, TripTermDTO } from '@sf/sf-base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { map } from 'rxjs';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'sf-trip-term-details',
  imports: [
    NzInputNumberComponent,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzTableComponent,
    SfButtonComponent,
    NzInputDirective,
  ],
  templateUrl: './trip-term-details.component.html',
  styleUrl: './trip-term-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripTermDetailsComponent {
  public sfTripTerms = input<TripTermDTO[]>([]);
  public readonly sfTripTermsUpdated = output<TripTermDTO[]>();

  public readonly __controls = {
    name: new FormControl<string>('', { nonNullable: true }),
    dateFrom: new FormControl<Date | null>(null),
    dateTo: new FormControl<Date | null>(null),
    price: new FormControl<number>(0, { nonNullable: true }),
    participantsTotal: new FormControl<number>(0, { nonNullable: true }),
    participantsCurrent: new FormControl<number>(0, { nonNullable: true }),
  };
  public __formGroup = new FormGroup(this.__controls);
  public readonly __columns = ['ID terminu', 'Daty', 'Cena', 'Wolne miejsca'];
  public __editId: number | undefined;

  constructor() {
    this.__formGroup.valueChanges
      .pipe(
        map(() => this.__formGroup.getRawValue()),
        takeUntilDestroyed(),
      )
      .subscribe((fg) => {
        const tripTerms = this.sfTripTerms();

        this.__formGroup.patchValue({
          name: fg.name,
          dateFrom: fg.dateFrom,
          dateTo: fg.dateTo,
          price: fg.price,
          participantsCurrent: fg.participantsCurrent,
          participantsTotal: fg.participantsTotal,
        });
      });
  }

  startEdit(id: number): void {
    this.__editId = id;
  }

  stopEdit(): void {
    this.__editId = undefined;
  }

  __addTripTerm() {
    const newTripTerm = {
      Name: this.__controls.name.value,
      DateFrom: this.__controls.dateFrom.value,
      DateTo: this.__controls.dateTo.value,
      Price: this.__controls.price.value,
      ParticipantsTotal: this.__controls.participantsTotal.value,
      ParticipantsCurrent: this.__controls.participantsCurrent.value,
    } as TripTermDTO;
    this.sfTripTermsUpdated.emit([...(this.sfTripTerms() ?? []), newTripTerm]);
    this.__formGroup.reset();
  }
}
