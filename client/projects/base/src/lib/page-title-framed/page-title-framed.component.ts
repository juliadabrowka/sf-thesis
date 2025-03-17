import {Component, Input} from '@angular/core';

@Component({
  selector: 'sf-page-title-framed',
  imports: [],
  templateUrl: './page-title-framed.component.html',
  styleUrl: './page-title-framed.component.css'
})
export class PageTitleFramedComponent {
  @Input() public sfTitle: string | null | undefined;

}
