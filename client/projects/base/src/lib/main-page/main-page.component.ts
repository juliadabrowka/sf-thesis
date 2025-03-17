import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageTitleComponent} from '../page-title/page-title.component';

@Component({
  selector: 'sf-main-page',
  imports: [
    PageTitleComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfMainPageComponent {
  public readonly title = "superfemka to wyprawy rowerowe, wyjazdy i warsztaty dla kobiet";
  public readonly subtitle = "niezapomniana podróż dla każdej z nas!";

}
