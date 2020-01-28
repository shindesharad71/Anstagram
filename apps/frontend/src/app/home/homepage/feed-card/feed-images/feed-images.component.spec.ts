import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedImagesComponent } from './feed-images.component';

describe('FeedImagesComponent', () => {
  let component: FeedImagesComponent;
  let fixture: ComponentFixture<FeedImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
