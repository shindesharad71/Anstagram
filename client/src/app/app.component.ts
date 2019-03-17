import { Component, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';
import { LoaderService } from './core/components/loader/loader.service';

@Component({
  selector: 'ia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  constructor(private loaderService: LoaderService, private vcr: ViewContainerRef) {
    this.loaderService.setViewContainer(vcr);
  }

  ngOnInit() {

  }
}
