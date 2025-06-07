import { Component, input } from '@angular/core';

@Component({
  selector: 'sf-page-title-framed',
  imports: [],
  templateUrl: './page-title-framed.component.html',
  styleUrl: './page-title-framed.component.css',
})
export class PageTitleFramedComponent {
  public readonly sfTitle = input<string | null | undefined>('');
  public readonly sfToUpperCase = input<boolean | null | undefined>(true);
  public readonly sfFontSize = input<number | null | undefined>(34);
  public readonly sfColor = input<string | null | undefined>('#fff');
  public readonly sfBorderStroke = input<number | null | undefined>(2);
}
