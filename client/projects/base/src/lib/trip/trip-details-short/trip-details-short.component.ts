import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TripDTO, TripTermDTO } from '@sf/sf-base';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

@Component({
  selector: 'sf-trip-details-short',
  imports: [NzDividerComponent],
  templateUrl: './trip-details-short.component.html',
  styleUrl: './trip-details-short.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripDetailsShortComponent {
  __getTripMonth(tripTerms: TripTermDTO[]) {
    return getTripMonth(tripTerms);
  }

  public readonly sfTripDetails = input<TripDTO | null | undefined>();

  __getTripLength(tripTerms: TripTermDTO[]): string {
    return getTripLength(tripTerms);
  }
}

export function getTripMonth(tripTerms: TripTermDTO[]): string {
  const uniqueMonths = [
    ...new Set(tripTerms.map((tt) => new Date(tt.DateFrom!).getMonth() ?? 0)),
  ];

  const getMonthsNames = (monthNumber: number) => {
    const months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ];

    return months[monthNumber] || 'Nieznany miesiąc';
  };
  return uniqueMonths
    .map((month) => getMonthsNames(month))
    .join(', ')
    .toLowerCase();
}

export function getTripLength(tripTerms: TripTermDTO[]): string {
  const totalDays = tripTerms
    .filter((tt) => tt.DateFrom && tt.DateTo)
    .reduce((acc, tt) => {
      const from = new Date(tt.DateFrom!);
      const to = new Date(tt.DateTo!);

      const diffInMs = to.getTime() - from.getTime();
      const diffInDays = diffInMs / (1000 * 3600 * 24);

      return acc + diffInDays;
    }, 0);

  const averageLength = totalDays / tripTerms.length;

  return averageLength ? `${Math.round(averageLength)} dni` : 'Brak danych';
}
