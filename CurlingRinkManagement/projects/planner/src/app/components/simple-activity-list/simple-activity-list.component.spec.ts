import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleActivityListComponent } from './simple-activity-list.component';

describe('SimpleActivityListComponent', () => {
  let component: SimpleActivityListComponent;
  let fixture: ComponentFixture<SimpleActivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleActivityListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
