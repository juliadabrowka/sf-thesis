import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SfButtonComponent, TripDTO} from '@sf/sf-base';

@Component({
  selector: 'sf-trip-inline',
  imports: [
    SfButtonComponent
  ],
  templateUrl: './trip-inline.component.html',
  styleUrl: './trip-inline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfTripInlineComponent {
  @Input() public sfTripInfo: TripDTO | null | undefined;
  @Input() public sfFlagImgUrl: string | null | undefined;


}
