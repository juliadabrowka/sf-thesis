import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'sf-icon-and-text',
  imports: [FaIconComponent, NzIconModule],
  templateUrl: './icon-and-text.component.html',
  styleUrl: './icon-and-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfIconAndTextComponent {
  public readonly sfIcon = input<IconDefinition | null | undefined>();
  public readonly sfIconSrc = input<string | null | undefined>();
  public readonly sfText = input<string | null | undefined>();
  public readonly sfReverse = input<boolean | null | undefined>();
}
