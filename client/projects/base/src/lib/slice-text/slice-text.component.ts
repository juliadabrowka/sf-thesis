import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'sf-slice-text',
  imports: [SlicePipe],
  templateUrl: './slice-text.component.html',
  styleUrl: './slice-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliceTextComponent {
  public readonly sfText = input<string | null | undefined>();
  public readonly sfMaxLength = input<number>(150);
}
