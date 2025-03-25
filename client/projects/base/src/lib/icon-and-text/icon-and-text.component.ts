import {ChangeDetectionStrategy, Component, Input, input} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sf-icon-and-text',
  imports: [
    FaIconComponent
  ],
  templateUrl: './icon-and-text.component.html',
  styleUrl: './icon-and-text.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfIconAndTextComponent {
  @Input() public sfIcon: IconDefinition | null | undefined;
  @Input() public sfIconSrc: string | null | undefined;
  public readonly sfText = input<string | null>();
  public readonly sfReverse = input<boolean | null>();
}
