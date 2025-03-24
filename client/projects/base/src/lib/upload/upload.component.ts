import {ChangeDetectionStrategy, Component, DestroyRef, inject, output} from '@angular/core';
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile, NzUploadXHRArgs} from 'ng-zorro-antd/upload';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {SfIconAndTextComponent} from '../icon-and-text/icon-and-text.component';
import {SfIcons} from '../icons';
import {UploadService} from '../../services/upload-service.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'sf-upload',
  imports: [
    NzUploadComponent,
    NzButtonComponent,
    SfIconAndTextComponent
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfUploadComponent {
  private readonly uploadService = inject(UploadService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly __icons = SfIcons;

  public fileList: NzUploadFile[] = [];
  public readonly sfUploadedFiles = output<NzUploadFile>();

  uploadCustom = (item: NzUploadXHRArgs) => {
    const file = item.file as NzUploadFile;
    console.log('Uploading:', file);

    return this.uploadService.uploadFile(file)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((f) => {
        console.log(f)
        //       this.sfUploadedFiles.emit(event.body.url);
      })

    // {
    //   next: (event) => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       const percent = Math.round((100 * event.loaded) / (event.total || 1));
    //       item.onProgress({ percent });
    //     } else if (event.type === HttpEventType.Response) {
    //       item.onSuccess(event.body, file, event);

    //       console.log('File uploaded:', event.body.url);
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Upload error:', err);
    //     item.onError(err, file);
    //   },
    // });
  };

  onUploadChange(e: NzUploadChangeParam): void {
    const file = e.file;
    console.log(e)
    if (file.status === 'done') {
      const imageUrl = file.response.url;
      this.sfUploadedFiles.emit(imageUrl);
      console.log(imageUrl)
    }
  }
}
