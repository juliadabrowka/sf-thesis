import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { SfButtonComponent, TripTermDTO } from '@sf/sf-base';
import {
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
  public readonly sfTripTerms = input<TripTermDTO[] | null | undefined>([]);
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
  public readonly __formGroup = new FormGroup(this.__controls);
  public readonly __columns = ['ID terminu', 'Daty', 'Cena', 'Wolne miejsca'];
  public readonly editId = signal<number | undefined>(undefined);
  private readonly __editForms = signal<Record<number, FormGroup>>({});

  constructor() {
    effect(() => {
      const tripTerms = this.sfTripTerms();
      //tripTerms.forEach((tripTerm) => this.patchTripTerms(tripTerm));
    });
  }

  startEdit(tripTermDTO: TripTermDTO): void {
    if (tripTermDTO.Id === undefined) {
      throw new Error('TripTerm is required');
    }
    console.log(tripTermDTO);
    this.editId.set(tripTermDTO.Id);
  }

  stopEdit(): void {
    this.editId.set(undefined);
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

    const form = this.__editForms()[id];
    if (form.invalid) return;

    const updatedTripTerms = (this.sfTripTerms() ?? []).map((term) =>
      term.Id === id ? { ...term, ...form.getRawValue() } : term,
    );

    this.sfTripTermsUpdated.emit(updatedTripTerms);
    this.stopEdit();
  }
}
