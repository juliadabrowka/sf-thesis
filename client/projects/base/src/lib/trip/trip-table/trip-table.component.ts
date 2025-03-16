import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, output} from '@angular/core';
import {NzTableModule, NzThAddOnComponent} from "ng-zorro-antd/table";
import {ColumnItem, TripDTO} from '@sf/sf-base';
import {BehaviorSubject} from 'rxjs';

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

  public readonly __trips$$ = new BehaviorSubject<TripDTO[]>([]);

  @Input() public set sfTrips(trips: TripDTO[] | null | undefined) {
    console.log(trips)
    this.__trips$$.next(trips ?? []);
    this.cdr.markForCheck()
  }

  @Input() sfLoading: boolean | null | undefined;

  public readonly sfOnTripClick = output<TripDTO>();

  public readonly __columns: ColumnItem<TripDTO>[] = [
    {
      name: 'Nazwa',
      sortFn: (a: TripDTO, b: TripDTO) => (a.ArticleDto?.Title ?? "").localeCompare(b.ArticleDto?.Title ?? ""),
    },
    {
      name: 'Kraj',
      sortFn: (a: TripDTO, b: TripDTO) => (a.ArticleDto?.Country ?? "").localeCompare(b.ArticleDto?.Country ?? ""),
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

  trackByIndex(_: number, data: TripDTO): number {
    return data.Id ?? -1;
  }
}
