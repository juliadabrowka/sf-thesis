import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal
} from '@angular/core';
import {NzTableModule, NzThAddOnComponent} from "ng-zorro-antd/table";
import {ColumnItem, TripDTO} from '@sf/sf-base';

@Component({
  selector: 'sf-trip-table',
  imports: [
    NzThAddOnComponent,
    NzTableModule
  ],
  templateUrl: './trip-table.component.html',
  styleUrl: './trip-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripTableComponent {
  private readonly cdr = inject(ChangeDetectorRef)

  public readonly __trips$$ = signal<TripDTO[]>([]);

  @Input() public set sfTrips(trips: TripDTO[] | null | undefined) {
    this.__trips$$.set(trips ?? []);
  }

  @Output() public readonly sfOnTripClick = new EventEmitter<TripDTO>();

  public readonly __columns: ColumnItem<TripDTO>[] = [
    {
      name: 'Nazwa',
      sortFn: (a: TripDTO, b: TripDTO) => a.Article.Title.localeCompare(b.Article.Title),
    },
    {
      name: 'Kraj',
      sortFn: (a: TripDTO, b: TripDTO) => a.Article.Country.localeCompare(b.Article.Country),
    },
    {
      name: 'Data rozpoczęcia',
      sortFn: null
    },
    {
      name: 'Data zakończenia',
      sortFn: null
    },
    {
      name: 'Cena',
      sortFn: (a: TripDTO, b: TripDTO) => a.Price - b.Price,
    },
    {
      name: 'Ilość uczestniczek',
      sortFn: (a: TripDTO, b: TripDTO) => a.ParticipantsCurrent - b.ParticipantsCurrent,
    },
    {
      name: 'Rodzaj wyprawy',
      sortFn: (a: TripDTO, b: TripDTO) => a.Type.localeCompare(b.Type),
    },
  ]

}
