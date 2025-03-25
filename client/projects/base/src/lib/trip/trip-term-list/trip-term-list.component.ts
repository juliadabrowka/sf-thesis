import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TripTermDTO} from '@sf/sf-base';
import {TripTermDetailsComponent} from '../trip-term-details/trip-term-details.component';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';

@Component({
  selector: 'sf-trip-term-list',
  imports: [
    TripTermDetailsComponent,
    NzEmptyComponent
  ],
  templateUrl: './trip-term-list.component.html',
  styleUrl: './trip-term-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripTermListComponent {
  public sfTripTerms = input<TripTermDTO[]>([]);
}
