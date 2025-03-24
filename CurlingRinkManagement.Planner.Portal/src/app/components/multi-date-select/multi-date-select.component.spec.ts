import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDateSelectComponent } from './multi-date-select.component';

describe('MultiDateSelectComponent', () => {
  let component: MultiDateSelectComponent;
  let fixture: ComponentFixture<MultiDateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiDateSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
