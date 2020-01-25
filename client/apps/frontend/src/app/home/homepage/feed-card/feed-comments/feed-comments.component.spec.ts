import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCommentsComponent } from './feed-comments.component';

describe('FeedCommentsComponent', () => {
  let component: FeedCommentsComponent;
  let fixture: ComponentFixture<FeedCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
