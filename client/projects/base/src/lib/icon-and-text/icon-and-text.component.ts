import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
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
  @Input() public sfText: string | null | undefined;
  @Input() public sfReverse: boolean | null | undefined;
}
