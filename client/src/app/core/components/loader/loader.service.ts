import { Injectable, ViewContainerRef, Inject, ComponentFactoryResolver } from '@angular/core';
import { LoaderComponent } from './loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  rootViewContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  setViewContainer(vcr) {
    this.rootViewContainer = vcr;
  }

  show() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
    this.rootViewContainer.clear();
    const container = this.rootViewContainer.createComponent(componentFactory);
  }

  dismiss() {
    this.rootViewContainer.clear();
  }
}
