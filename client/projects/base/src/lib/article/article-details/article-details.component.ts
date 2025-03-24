import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {QuillViewComponent} from 'ngx-quill';
import {ActivatedRoute} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'sf-article-details',
  imports: [
    QuillViewComponent
  ],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfArticleDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        console.log(params)
        const param = params.get("customLink");
        console.log(param)
      })
  }
}
