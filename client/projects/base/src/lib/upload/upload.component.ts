import {ChangeDetectionStrategy, Component, inject, output} from '@angular/core';
import {SfIcons} from '../icons';
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile} from 'ng-zorro-antd/upload';
import {SfIconAndTextComponent} from '../icon-and-text/icon-and-text.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {UploadService} from '../../services/upload-service.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'sf-upload',
  imports: [
    NzUploadComponent,
    SfIconAndTextComponent,
    NzButtonComponent,
    NzIconModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfUploadComponent {
  private readonly uploadService = inject(UploadService)
  private readonly msg = inject(NzMessageService);

  public readonly __icons = SfIcons;
  public fileList: NzUploadFile[] = [];
  public readonly sfUploadedImgUrl = output<string>();

  onUploadChange(info: NzUploadChangeParam) {
    if (info.file.status === 'uploading') {
      console.log('Uploading...', info.file);
    }
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  customUpload = (item: any) => {
    const file = item.file as File;

    return this.uploadService.uploadFile(file).subscribe({
      next: (res) => {
        item.onSuccess!(res, item.file, {});
        console.log(item.file)
        this.sfUploadedImgUrl.emit(res.imageUrl)
        this.msg.success('Upload successful');
      },
      error: (err) => {
        item.onError!(err);
        this.msg.error('Upload failed');
      }
    });
  };
}
