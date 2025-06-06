import { Component, input } from '@angular/core';

@Component({
  selector: 'sf-page-title-framed',
  imports: [],
  templateUrl: './page-title-framed.component.html',
  styleUrl: './page-title-framed.component.css',
})
export class PageTitleFramedComponent {
  public readonly sfTitle = input<string | null | undefined>('');
  public readonly sfToUpperCase = input<boolean | null | undefined>(false);
}
