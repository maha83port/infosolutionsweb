import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionFileComponent } from './transcription-file.component';

describe('TranscriptionFileComponent', () => {
  let component: TranscriptionFileComponent;
  let fixture: ComponentFixture<TranscriptionFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
