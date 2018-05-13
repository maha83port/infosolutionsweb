import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptionsSubtitlesComponent } from './captions-subtitles.component';

describe('CaptionsSubtitlesComponent', () => {
  let component: CaptionsSubtitlesComponent;
  let fixture: ComponentFixture<CaptionsSubtitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptionsSubtitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptionsSubtitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
