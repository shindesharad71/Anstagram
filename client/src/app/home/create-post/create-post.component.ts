import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FeedService } from 'src/app/core/services/feed/feed.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/core/components/loader/loader.service';

@Component({
  selector: 'ia-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('imageUpload') imageUpload: any;

  createPostForm: FormGroup;
  isError = false;
  uploadedFiles: any = [];
  formData: FormData = new FormData();
  userLocation = null;
  errorMessage: string;
  notificationType = 'is-danger';

  pondOptions = {
    class: 'image-upload',
    multiple: false,
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
    allowImageTransform: true
  };

  // tslint:disable-next-line: max-line-length
  constructor(private titleService: Title, private feedService: FeedService, private router: Router, private loaderService: LoaderService) { }

  ngOnInit() {
    this.titleService.setTitle('Create Post');
    this.createPostForm = new FormGroup({
      description: new FormControl(''),
      location: new FormControl('')
    });
  }

  onFilesAdded() {
    this.uploadedFiles = [];
    const images = this.imageUpload.getFiles();
    for (const img of images) {
      this.uploadedFiles.push(img.file);
    }
  }

  createPost() {
    this.uploadedFiles = [];
    const images = this.imageUpload.getFiles();
    for (const img of images) {
      this.uploadedFiles.push(img.file);
    }
    this.formData.set('images', this.uploadedFiles[0]);
    this.formData.set('description', this.createPostForm.value.description);
    this.formData.set('location', this.createPostForm.value.location);
    this.feedService.createUserFeed(this.formData).subscribe(res => {
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
