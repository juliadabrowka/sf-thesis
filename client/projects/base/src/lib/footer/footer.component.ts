import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FooterPieceComponent } from './footer-piece/footer-piece.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'sf-footer',
  imports: [FooterPieceComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfFooterComponent {
  private readonly __router = inject(Router);

  public readonly newsletterTemplate =
    viewChild<TemplateRef<any>>('newsletterTemplate');
  public readonly footerPieces = signal<
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
  public readonly hideFooter = signal(false);

  constructor() {
    this.__router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        event.url.includes('/trip-application/')
      )
        this.hideFooter.set(true);
    });

    effect(() => {
      const template = this.newsletterTemplate();
      if (template) {
        this.footerPieces.update((pieces) =>
          pieces.map((p) =>
            p.title.includes('newsletter') ? { ...p, content: template } : p,
          ),
        );
      }
    });
  }
}
