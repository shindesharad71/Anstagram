import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ia-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('imageUpload', { static: true }) imageUpload: any;

  createPostForm: FormGroup;
  isError = false;
  uploadedFiles: any = [];
  formData: FormData = new FormData();
  userLocation = null;
  errorMessage: string;
  notificationType = 'is-danger';

  pondOptions = {
    class: 'image-upload',
    multiple: true,
    maxFiles: 4,
    labelIdle: 'Drop files here or Browse',
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
        load();
      }
    }
  };

  // tslint:disable-next-line: max-line-length
  constructor(private titleService: Title, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.titleService.setTitle('Create Post');
    this.createPostForm = new FormGroup({
      description: new FormControl(''),
      location: new FormControl('')
    });
  }

  createPost() {
    this.createPostForm.value.media = this.uploadedFiles;
    this.httpService.post('feed', this.createPostForm.value).subscribe(res => {
      this.router.navigateByUrl('/');
    }, err => {
      console.log(err);
    });
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(this.userLocation);
      }, (failure) => {
        if (failure.message.indexOf('Only secure origins are allowed') === 0) {
          alert('Only secure origins are allowed by your browser.');
        }
      });
    } else {
      console.log('geolocation not supported');
    }
  }
}
