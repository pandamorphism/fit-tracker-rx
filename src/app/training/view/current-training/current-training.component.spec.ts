import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTrainingComponent } from './current-training.component';
import {MaterialModule} from '../../../material/material.module';
import {FloorPipe} from '../../service/floor.pipe';

describe('CurrentTrainingComponent', () => {
  let component: CurrentTrainingComponent;
  let fixture: ComponentFixture<CurrentTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CurrentTrainingComponent, FloorPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
