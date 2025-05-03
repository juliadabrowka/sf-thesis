import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { SfButtonComponent, SfIcons, TripTermDTO } from '@sf/sf-base';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzCellAlignDirective, NzTableComponent } from 'ng-zorro-antd/table';
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
    NzCellAlignDirective,
  ],
  templateUrl: './trip-term-details.component.html',
  styleUrl: './trip-term-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripTermDetailsComponent {
  public readonly icons = SfIcons;
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

      if (tripTerms) {
        tripTerms.forEach((tripTerm) => {
          const editForms = this.__editForms();

          if (!tripTerm.Id) {
            return;
          }

          editForms[tripTerm.Id] = new FormGroup({
            name: new FormControl(tripTerm.Name ?? '', { nonNullable: true }),
            dateFrom: new FormControl(tripTerm.DateFrom ?? null),
            dateTo: new FormControl(tripTerm.DateTo ?? null),
            price: new FormControl(tripTerm.Price ?? 0, { nonNullable: true }),
            participantsTotal: new FormControl(
              tripTerm.ParticipantsTotal ?? 0,
              { nonNullable: true },
            ),
            participantsCurrent: new FormControl(
              tripTerm.ParticipantsCurrent ?? 0,
              { nonNullable: true },
            ),
          });
        });
      }
    });
  }

  startEdit(tripTermDTO: TripTermDTO): void {
    if (tripTermDTO.Id === undefined) {
      throw new Error('TripTerm is required');
    }

    this.editId.set(tripTermDTO.Id);
  }

  stopEdit(): void {
    this.editId.set(undefined);
  }

  addTripTerm() {
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
    this.stopEdit();
  }
}
