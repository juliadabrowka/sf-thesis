import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { SfButtonComponent, TripTermDTO } from '@sf/sf-base';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sf-trip-term-details',
  imports: [
    NzInputNumberComponent,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzTableComponent,
    SfButtonComponent,
    NzInputDirective,
    DatePipe,
    FormsModule,
  ],
  templateUrl: './trip-term-details.component.html',
  styleUrl: './trip-term-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripTermDetailsComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly sfTripTerms = input<TripTermDTO[]>([]);
  public readonly sfTripId = input<number | null | undefined>(undefined);
  public readonly sfTripTermsUpdated = output<TripTermDTO[]>();

  public readonly __controls = {
    name: new FormControl<string>('', { nonNullable: true }),
    dateFrom: new FormControl<Date | null>(null),
    dateTo: new FormControl<Date | null>(null),
    price: new FormControl<number>(0, { nonNullable: true }),
    participantsTotal: new FormControl<number>(0, { nonNullable: true }),
    participantsCurrent: new FormControl<number>(0, { nonNullable: true }),
  };
  public readonly __tripTermControls = {
    tripTermId: new FormControl<number | null>(null),
    tripTermName: new FormControl<string>('', { nonNullable: true }),
    tripTermDateFrom: new FormControl<Date | null>(null),
    tripTermDateTo: new FormControl<Date | null>(null),
    tripTermPrice: new FormControl<number>(0, { nonNullable: true }),
    tripTermParticipantsTotal: new FormControl<number>(0, {
      nonNullable: true,
    }),
    tripTermParticipantsCurrent: new FormControl<number>(0, {
      nonNullable: true,
    }),
  };
  public __formGroup = new FormGroup(this.__controls);
  public __tripTerms = new FormArray([
    new FormControl<number | null>(null),
    new FormControl<string>('', { nonNullable: true }),
    new FormControl<Date | null>(null),
    new FormControl<Date | null>(null),
    new FormControl<number>(0, { nonNullable: true }),
    new FormControl<number>(0, { nonNullable: true }),
    new FormControl<number>(0, { nonNullable: true }),
  ]);

  public readonly __columns = ['ID terminu', 'Daty', 'Cena', 'Wolne miejsca'];
  public __editId: number | undefined;
  __editForms: Record<number, FormGroup> = {};

  constructor() {
    toObservable(this.sfTripTerms)
      .pipe(takeUntilDestroyed())
      .subscribe((tripTerms) => {
        //tripTerms.forEach((tripTerm) => this.patchTripTerms(tripTerm));
        this.cdr.markForCheck();
      });

    // this.__formGroup.valueChanges
    //   .pipe(
    //     map(() => this.__formGroup.getRawValue()),
    //     takeUntilDestroyed(),
    //   )
    //   .subscribe(async (fg) => {
    //     const tripTerm = this.sfTripTerms();
    //     const currentTripTerms = isNil(tripTerm) ? [] : tripTerm;
    //
    //     console.log(currentTripTerms);
    //   });
  }

  startEdit(tripTermDTO: TripTermDTO): void {
    if (tripTermDTO.Id === undefined) {
      throw new Error('TripTerm is required');
    }
    console.log(tripTermDTO);
    this.__editId = tripTermDTO.Id;
  }

  stopEdit(): void {
    this.__editId = undefined;
  }

  __addTripTerm() {
    const newTripTerm: TripTermDTO = {
      Id: undefined,
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

  __saveTripTerms(id: number | undefined) {
    if (id === undefined) {
      throw new Error('Trip id is undefined but should not be');
    }

    const form = this.__editForms[id];
    if (form.invalid) return; // Prevent saving if form is invalid

    const updatedTripTerms = this.sfTripTerms().map((term) =>
      term.Id === id ? { ...term, ...form.getRawValue() } : term,
    );

    this.sfTripTermsUpdated.emit(updatedTripTerms); // Emit updated terms
    this.stopEdit();
  }
}
