import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'ia-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.scss']
})
export class ChangeProfilePicComponent implements OnInit {
  @ViewChild('imageUpload') imageUpload: any;

  isError = false;
  uploadedFiles: any = [];
  errorMessage: string;
  notificationType = 'is-danger';

  pondOptions = {
    class: 'image-upload',
    multiple: false,
    maxFiles: 1,
    labelIdle: 'Drop file here or Browse',
    acceptedFileTypes: 'image/jpeg, image/png',
    allowImageExifOrientation: true,
    allowImagePreview: true,
    imagePreviewMinHeight: 44,
    imagePreviewMaxHeight: 100,
    imagePreviewMaxFileSize: 20,
    allowImageCrop: true,
    imageCropAspectRatio: '1:1',
    allowImageTransform: true,
    server: {
      url: `${environment.BASE_URL}users/upload`,
      process: {
        onload: (response) => this.uploadedFiles.push(response),
        onerror: (response) => console.log('onerror', response)
      },
      revert: (uniqueFileId, load) => {
        this.uploadedFiles = [];
        load();
      }
    }
  };

  constructor(private titleService: Title, private router: Router, private httpService: HttpService, private location: Location) { }

  ngOnInit() {
    this.titleService.setTitle('Change Profile Picture');
  }

  updateProfilePic() {
    const changeProfilePicPayload = { pic: this.uploadedFiles[0] };
    this.httpService.post('profile/change-profile-pic', changeProfilePicPayload).subscribe(res => {
      this.goBack();
    }, err => {
      console.log(err);
    });
  }

  goBack() {
    this.location.back();
  }

}
