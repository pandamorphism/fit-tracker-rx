import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTrainingComponent} from './new-training.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';

describe('NewTrainingComponent', () => {
  let component: NewTrainingComponent;
  let fixture: ComponentFixture<NewTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      declarations: [NewTrainingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
