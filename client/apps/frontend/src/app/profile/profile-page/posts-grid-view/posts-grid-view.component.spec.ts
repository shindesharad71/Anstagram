import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsGridViewComponent } from './posts-grid-view.component';

describe('PostsGridViewComponent', () => {
  let component: PostsGridViewComponent;
  let fixture: ComponentFixture<PostsGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
