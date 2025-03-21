import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'sf-button',
  imports: [
    AsyncPipe
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfButtonComponent {
  public sfButtonText = input<string | null | undefined>('');
  public __text$ = toObservable(this.sfButtonText);

  public sfDisabled = input<boolean | null | undefined>(false);
  public __disabled$ = toObservable(this.sfDisabled);

  public readonly sfOnButtonClicked = output();
}
