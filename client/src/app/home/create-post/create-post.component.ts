import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ia-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('myPond') myPond: any;
  isError = false;
  errorMessage = '';

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

  constructor() { }

  ngOnInit() {
  }

  pondHandleAddFile(event) {
    console.log(event.file);
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
