import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SfIcons } from '@sf/sf-base';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'sf-hint',
  imports: [FaIconComponent, NzTooltipDirective],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintComponent {
  public readonly icons = SfIcons;
  public readonly sfTooltipTitle = input<string | null | undefined>();
  public readonly sfTooltipPlacement = input('left', {
    transform: (placement: string | string[] | undefined) =>
      placement ?? 'left',
  });
}
