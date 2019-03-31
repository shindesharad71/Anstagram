import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FeedService } from 'src/app/core/services/feed/feed.service';

@Component({
  selector: 'ia-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('imageUpload') imageUpload: any;
  isError = false;
  errorMessage = '';
  uploadedFiles: any = [];
  formData: FormData = new FormData();
  userLocation = null;
  description: '';

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
    imagePreviewMaxFileSize: 20
  };

  constructor(private titleService: Title, private feedService: FeedService) { }

  ngOnInit() {
    this.titleService.setTitle('Create Post');
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
    console.log(images);
    for (const img of images) {
      this.uploadedFiles.push(img.file);
    }
    this.formData.set('images', this.uploadedFiles[0]);
    this.feedService.createUserFeed(this.formData).subscribe(res => {
      console.log(res);
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

  removeErrorMessage() {
    if (document.readyState === 'complete') {
      const allNotifications = document.querySelectorAll('.notification');
      allNotifications.forEach((notificationToDelete: any) => {
        notificationToDelete.remove();
      });
    }
  }
}
