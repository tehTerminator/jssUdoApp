import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';


@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {
  listing_id: number;
  imageData = "../assets/noImage.jpg";
  result = '';

  constructor(
    private route: ActivatedRoute,
    private camera: Camera,
    private webview: WebView,
    private transfer: FileTransfer,
    private file: File
  ) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.listing_id = +res['listing_id'];
    });
  }

  takePicture(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = this.webview.convertFileSrc(imageData);
    });
  }

  uploadPicture(): void {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: `${this.listing_id}.jpg`,
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(this.imageData, 'http://maharajac.in/app/jss_images/upload.php', options)
      .then((data) => {
        this.result = JSON.stringify(data);
      }, (err) => {
        // error
        this.result = JSON.stringify(err);
      })
  }


}
