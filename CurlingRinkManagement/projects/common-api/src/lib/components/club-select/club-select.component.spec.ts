import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSelectComponent } from './club-select.component';

describe('ClubSelectComponent', () => {
  let component: ClubSelectComponent;
  let fixture: ComponentFixture<ClubSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
