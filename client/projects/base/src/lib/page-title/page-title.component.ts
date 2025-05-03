import { Component, input } from '@angular/core';

@Component({
  selector: 'sf-page-title',
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css',
})
export class PageTitleComponent {
  public readonly sfTitle = input<string | null | undefined>();
  public readonly sfSubTitle = input<string | null | undefined>();
}
