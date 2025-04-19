import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FooterPieceComponent } from './footer-piece/footer-piece.component';

@Component({
  selector: 'sf-footer',
  imports: [FooterPieceComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfFooterComponent {
  public newsletterTemplate = viewChild<TemplateRef<any>>('newsletterTemplate');

  public readonly __footerPieces = signal<
    { title: string; content: string[] | TemplateRef<any> }[]
  >([
    {
      title: 'Dane teleadresowe',
      content: ['GSM: 123 456 789', 'email@email.com', 'NIP: 987 654 32 10'],
    },
    {
      title: 'Na skróty',
      content: [
        'Ciekawostki',
        'Wakacje dla aktywnych',
        'Fotorelacje z podrózy',
        'Rekomendacje',
        'Weekendowe wojaże Femki',
      ],
    },
    {
      title: 'Dokumenty',
      content: ['Polityka prywatności', 'RODO & cookies'],
    },
    {
      title: 'Zapisz się do naszego newslettera',
      content: [''],
    },
  ]);

  constructor() {
    effect(() => {
      const template = this.newsletterTemplate();
      if (template) {
        this.__footerPieces.update((pieces) =>
          pieces.map((p) =>
            p.title.includes('newsletter') ? { ...p, content: template } : p,
          ),
        );
      }
    });
  }
}
