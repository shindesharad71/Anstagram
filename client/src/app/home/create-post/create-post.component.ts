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
    allowImagePreview: true,
    imagePreviewMinHeight: 44,
    imagePreviewMaxHeight: 256
  };

  pondFiles = [];

  constructor() { }

  ngOnInit() {
  }

  pondHandleInit() {
    // console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
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
