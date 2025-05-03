import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'sf-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfButtonComponent {
  public readonly sfButtonText = input<string | null | undefined>();
  public readonly sfDisabled = input(false);
  public readonly sfFontSize = input('18px');

  public readonly sfOnButtonClicked = output();
}
