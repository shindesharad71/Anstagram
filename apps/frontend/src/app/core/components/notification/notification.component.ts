import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ia-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() message: string;
  @Input() className: string;
  appear = 'appear';

  constructor() { }

  ngOnInit() {
  }

  hideNotification() {
    this.message = null;
    return true;
  }

}
