import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  headPictureUrl: string;
  // 图片显示路径
  imageUrl: string;

  ngOnInit(): void {
  }

  getImagePath = (event: string) => {
    this.imageUrl = event;
  };

}
