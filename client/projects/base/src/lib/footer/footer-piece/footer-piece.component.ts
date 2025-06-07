import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sf-footer-piece',
  imports: [NgTemplateOutlet],
  templateUrl: './footer-piece.component.html',
  styleUrl: './footer-piece.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPieceComponent {
  private readonly __router = inject(Router);
  private readonly __activatedRoute = inject(ActivatedRoute);

  public readonly sfTitle = input<string | null | undefined>();
  public readonly sfContent = input<
    | { url: string; content: string }[]
    | string[]
    | TemplateRef<any>
    | null
    | undefined
  >();

  isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }

  isStringArray(value: any): value is string[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item === 'string')
    );
  }

  isUrlArray(value: any): value is { url: string; content: string }[] {
    return value instanceof Array;
  }

  async goToPageById(url: string) {
    await this.__router.navigate([url], { relativeTo: this.__activatedRoute });
  }
}
