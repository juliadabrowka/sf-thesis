import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NzTableModule, NzThAddOnComponent } from 'ng-zorro-antd/table';
import { ArticleDTO, ColumnItem } from '@sf/sf-base';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sf-trip-table',
  imports: [NzThAddOnComponent, NzTableModule, DatePipe],
  templateUrl: './trip-table.component.html',
  styleUrl: './trip-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTripTableComponent {
  public readonly sfArticles = input<ArticleDTO[]>([]);
  public readonly sfLoading = input<boolean | null>();

  public readonly sfOnTripClick = output<ArticleDTO>();

  public readonly __columns: ColumnItem<ArticleDTO>[] = [
    {
      name: 'Nazwa',
      sortFn: (a: ArticleDTO, b: ArticleDTO) => a.Title.localeCompare(b.Title),
    },
    {
      name: 'Kraj',
      sortFn: (a: ArticleDTO, b: ArticleDTO) =>
        a.Country.localeCompare(b.Country),
    },
    {
      name: 'Data rozpoczęcia',
      sortFn: null,
    },
    {
      name: 'Data zakończenia',
      sortFn: null,
    },
    {
      name: 'Cena',
      sortFn: null,
    },
    {
      name: 'Ilość uczestniczek',
      sortFn: null,
    },
    {
      name: 'Rodzaj wyprawy',
      sortFn: null,
      //sortFn: (a: ArticleDTO, b: ArticleDTO) => a.TripDto?.Type.localeCompare(b.TripDto?.Type ?? ''),
    },
  ];
}
