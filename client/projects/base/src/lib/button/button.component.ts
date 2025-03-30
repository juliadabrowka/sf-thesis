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
  public readonly sfButtonText = input<string | null>('');
  public readonly sfDisabled = input<boolean | null>(false);
  public readonly sfFontSize = input<string>('18px');

  public readonly sfOnButtonClicked = output();
}
