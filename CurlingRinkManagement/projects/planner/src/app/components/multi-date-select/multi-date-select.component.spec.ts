import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulyiSheetActivitySelectComponent } from './multi-date-select.component';

describe('MultiDateSelectComponent', () => {
  let component: MulyiSheetActivitySelectComponent;
  let fixture: ComponentFixture<MulyiSheetActivitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MulyiSheetActivitySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MulyiSheetActivitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
