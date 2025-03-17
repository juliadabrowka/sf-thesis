import {Component, Input} from '@angular/core';

@Component({
  selector: 'sf-page-title',
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent {
  @Input() public sfTitle: string | null | undefined;
  @Input() public sfSubTitle: string | null | undefined;

}
