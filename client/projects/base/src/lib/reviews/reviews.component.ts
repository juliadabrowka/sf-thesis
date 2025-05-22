import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';

@Component({
  selector: 'sf-reviews',
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class SfReviewsComponent implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    this.loadElfsightWidget();

    this.cdr.detectChanges();
  }

  loadElfsightWidget() {
    const element = document.querySelector(
      '.elfsight-app-ac67a5a1-a9ea-4785-b759-2a069959a3bc',
    );
    if (element && !element.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.onload = () => {
        console.log('Elfsight widget initialized');
      };
      element.appendChild(script);
    }
  }
}
