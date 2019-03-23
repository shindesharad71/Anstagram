import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ia-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  items = [1, 2, 3, 4, 5];
  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle('Home');
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('at bottom');
      const b = [14, 58, 47, 96];
      this.items.push(...b);
    }
  }

}
