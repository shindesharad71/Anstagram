import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FeedService } from 'src/app/core/services/feed/feed.service';

@Component({
  selector: 'ia-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('myPond') myPond: any;
  isError = false;
  errorMessage = '';
  uploadedFiles: any = [];
  formData: FormData = new FormData();

  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop files here or Browse',
    acceptedFileTypes: 'image/jpeg, image/png',
    allowImageExifOrientation: true,
    allowImagePreview: true,
    imagePreviewMinHeight: 44,
    imagePreviewMaxHeight: 256,
    imagePreviewMaxFileSize: 100,
    imagePreviewMaxInstantPreviewFileSize: 1000000
  };

  constructor(private titleService: Title, private feedService: FeedService) { }

  ngOnInit() {
    this.titleService.setTitle('Create Post');
  }

  async createPost() {
    const images = await this.myPond.getFiles();
    for (const img of images) {
      this.uploadedFiles.push(img.file);
    }

    console.log(this.uploadedFiles);
    this.formData.set('images', this.uploadedFiles);
    this.feedService.createUserFeed(this.formData).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
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
