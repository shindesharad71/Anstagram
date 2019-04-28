import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ia-posts-grid-view',
  templateUrl: './posts-grid-view.component.html',
  styleUrls: ['./posts-grid-view.component.scss']
})
export class PostsGridViewComponent implements OnInit {
  @Input() posts;
  constructor() { }

  ngOnInit() {
  }

}
