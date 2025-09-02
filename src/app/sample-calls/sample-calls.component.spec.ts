import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCallsComponent } from './sample-calls.component';

describe('SampleCallsComponent', () => {
  let component: SampleCallsComponent;
  let fixture: ComponentFixture<SampleCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleCallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
