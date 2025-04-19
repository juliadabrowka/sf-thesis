import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'sf-footer-piece',
  imports: [NgTemplateOutlet],
  templateUrl: './footer-piece.component.html',
  styleUrl: './footer-piece.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPieceComponent {
  public readonly sfTitle = input<string | null | undefined>();
  public readonly sfContent = input<
    string[] | TemplateRef<any> | null | undefined
  >();

  isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
