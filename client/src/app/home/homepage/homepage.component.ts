import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FeedService } from 'src/app/core/services/feed/feed.service';

@Component({
  selector: 'ia-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  feedItems = [];
  constructor(private router: Router, private titleService: Title, private feedService: FeedService) {
    this.titleService.setTitle('Home');
  }

  ngOnInit() {
    this.getFeed();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('at bottom');
      this.getFeed();
    }
  }

  getFeed() {
    this.feedService.getUserFeed().subscribe((res: any) => {
      console.log(res);
      this.feedItems.push(...res);
    }, err => {
      console.log(err);
    });
  }
}
