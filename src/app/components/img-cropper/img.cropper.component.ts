import {Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy} from '@angular/core';
import {HttpService} from '../../common/service/http.service';
import {NotificationService} from '../../common/service/notification.service';
import {CropperComponent} from 'angular-cropperjs';
import {Observable} from 'rxjs';
import {ServerResponse} from '../../common/model/server.response';

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img.cropper.component.html',
  styleUrls: ['./img.cropper.component.css']
})
export class ImgCropperComponent implements OnInit, OnDestroy {

  // 裁剪组件配置
  config = {
    aspectRatio: 1, // 裁剪框宽高比
    autoCropArea: 0.4,
    zoomable: true,
  };

  showUploadImageModal = false;      // 显示弹窗
  isUploadImageLoading = false;      // 图片正在上传转圈

  @Input() imageUrl: string;          // 源图片地址

  @Input() uploadImage = false;       // 是否上传,不上传图片会返回剪切图片的base64格式
  @Input() uploadUrl: string;         // 上传地址
  @Input() aspectRatio: number;       // 裁剪比例

  // 如果上传图片则返回图片的访问地址，否则返回图片的base64格式
  @Output() imagePathBack = new EventEmitter<string>();

  selectedImageUrl: string | ArrayBuffer = undefined;  // 选中的图片地址

  reader = new FileReader();         // 文件读取

  @ViewChild('angularCropper', {static: false})
  public angularCropper: CropperComponent;

  constructor(
    private httpService: HttpService,
    private noticeService: NotificationService) {
  }

  ngOnInit() {
    this.config.aspectRatio = this.aspectRatio || 1;
    // 初始化裁剪
    this.reader.addEventListener('load', this.fileLoadSuccess);
  }

  ngOnDestroy(): void {
    this.reader.removeEventListener('load', this.fileLoadSuccess);
  }

  /**
   * 打开弹窗
   */
  openModal = (file: File) => {
    // 显示弹窗
    this.showUploadImageModal = true;
    // 读取本地文件
    this.reader.readAsDataURL(file);
  };

  /**
   * 关闭弹窗
   */
  handleUploadImageCancel = (): void => {
    this.showUploadImageModal = false;
    // 图片裁剪销毁，这2行代码可以解决多个bug。
    this.selectedImageUrl = undefined;
    this.angularCropper.cropper.destroy();
  };

  /**
   * 点击确认按钮处理逻辑
   */
  handleUploadImageOk = (): void => {
    const croppedImageUrl = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    if (this.uploadImage) {
      // 上传图片，返回图片访问相对地址
      this.upload(croppedImageUrl);
    } else {
      // 裁剪图片返回base64格式字符串
      this.crop(croppedImageUrl);
    }
  };

  /**
   * 图片上传前处理逻辑
   */
  beforeUpload = (file: File): boolean | Observable<boolean> => {
    const isImage = file.type.startsWith('image');
    if (!isImage) {
      this.noticeService.error('请选择图片格式的文件！');
    } else {
      this.openModal(file);
    }
    return false;
  };

  /**
   * 上传文件
   */
  upload = (croppedImageUrl: string): void => {
    this.isUploadImageLoading = true;
    const body = {file: croppedImageUrl};
    this.httpService.post(this.uploadUrl, body).then(this.uploadImageSuccess);
  };

  /**
   * 裁剪文件
   */
  crop = (croppedImageUrl: string): void => {
    this.imagePathBack.emit(croppedImageUrl);
    this.handleUploadImageCancel();
  };

  /**
   * 图片上传后的处理
   */
  private uploadImageSuccess = (response: ServerResponse) => {
    this.isUploadImageLoading = false;
    if (response.success) {
      this.handleUploadImageCancel();
      // 传值给父组件
      this.imagePathBack.emit(response.data);
    }
  };

  private fileLoadSuccess = (): void => {
    this.selectedImageUrl = this.reader.result;
  };


}
