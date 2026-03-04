import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSheetActivitySelectComponent } from './multi-date-select.component';

describe('MultiDateSelectComponent', () => {
  let component: MultiSheetActivitySelectComponent;
  let fixture: ComponentFixture<MultiSheetActivitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSheetActivitySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSheetActivitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
