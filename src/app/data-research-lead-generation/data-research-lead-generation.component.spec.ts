import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataResearchLeadGenerationComponent } from './data-research-lead-generation.component';

describe('DataResearchLeadGenerationComponent', () => {
  let component: DataResearchLeadGenerationComponent;
  let fixture: ComponentFixture<DataResearchLeadGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataResearchLeadGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataResearchLeadGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
