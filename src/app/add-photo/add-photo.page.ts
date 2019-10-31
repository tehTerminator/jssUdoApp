import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
// import { WebView } from '@ionic-native/ionic-webview/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {
  listing_id: number;
  imageData = "../assets/noImage.jpg";
  loading = false;
  imageExist = false;

  constructor(
    private route: ActivatedRoute,
    private camera: Camera,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.listing_id = +res['listing_id'];
    });
    this.imageData = `http://maharajac.in/app/jss_images/${this.listing_id}.jpg`;
  }

  takePicture(): void {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 640,
      targetWidth: 480
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = `data:image/jpeg;base64,${imageData}`;
      this.imageExist = true;
    });
  }

  uploadPicture(): void {
    this.loading = true;
    const url = 'http://maharajac.in/app/jss_images/upload.php';
    const request = {
      data: this.imageData,
      fileName: `${this.listing_id}.jpg`,
    };
    this.http.post(url, request)
    .subscribe((res: any)=>{
      if( +res.status === 200 ){
        this.loading = false;
        this.router.navigate(['/view-listing', this.listing_id]);
      } else {
        alert('Unable to Upload Photo, Please Check Your Connection');
        this.loading = false;
      }
    });
  }

  loadDefault(): void {
    this.imageData = "../assets/noImage.jpg";
  }
}
