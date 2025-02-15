import {Component, EventEmitter, Output} from '@angular/core';
import {NzUploadChangeParam, NzUploadComponent, NzUploadFile} from 'ng-zorro-antd/upload';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {SfIconAndTextComponent} from '../icon-and-text/icon-and-text.component';
import {SfIcons} from '../icons';

@Component({
  selector: 'sf-upload',
  imports: [
    NzUploadComponent,
    NzButtonComponent,
    SfIconAndTextComponent
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  public readonly __icons = SfIcons;

  public fileList: NzUploadFile[] = [];
  mockOSSData = {
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw=='
  };


  @Output() public readonly sfUploadedFiles: EventEmitter<NzUploadFile[]> = new EventEmitter<NzUploadFile[]>();

  transformFile = (file: NzUploadFile): NzUploadFile => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = this.mockOSSData.dir + filename;
    return file;
  };

  getExtraData = (file: NzUploadFile): {} => {
    const {accessId, policy, signature} = this.mockOSSData;

    return {
      key: file.url,
      OSSAccessKeyId: accessId,
      policy,
      Signature: signature
    };
  };

  onChange(e: NzUploadChangeParam): void {
    this.sfUploadedFiles.emit(e.fileList);
  }
}
