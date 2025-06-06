import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ArticleDTO } from '@sf/sf-base';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sf-trip-table',
  imports: [NzTableModule, DatePipe],
  templateUrl: './trip-table.component.html',
  styleUrl: './trip-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTripTableComponent {
  public readonly sfArticles = input<ArticleDTO[] | null | undefined>([]);
  public readonly sfLoading = input<boolean | null | undefined>();
  public readonly sfOnTripClick = output<ArticleDTO>();
  public readonly columns = [
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
      name: 'Daty',
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
    },
  ];
}
