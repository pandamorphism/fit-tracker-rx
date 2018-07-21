import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainingComponent} from './training.component';
import {TrainingModule} from './training.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TrainingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
