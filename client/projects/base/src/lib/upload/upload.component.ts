import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { SfIcons } from '../icons';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { SfIconAndTextComponent } from '../icon-and-text/icon-and-text.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UploadService } from '../../services/upload-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'sf-upload',
  imports: [
    NzUploadComponent,
    SfIconAndTextComponent,
    NzButtonComponent,
    NzIconModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfUploadComponent {
  private readonly __uploadService = inject(UploadService);
  private readonly __messageService = inject(NzMessageService);

  public readonly icons = SfIcons;
  public readonly fileList = signal<NzUploadFile[]>([]);
  public readonly sfUploadedImgUrl = output<string>();

  customUpload = (item: any) => {
    const file = item.file as File;

    return this.__uploadService.uploadFile(file).subscribe({
      next: (res) => {
        item.onSuccess!(res, item.file, {});
        this.sfUploadedImgUrl.emit(res.imageUrl);
        this.__messageService.success('Plik poprawnie załadowany');
      },
      error: (err) => {
        item.onError!(err);
        this.__messageService.error('Plik nie został załadowany');
      },
    });
  };
}
