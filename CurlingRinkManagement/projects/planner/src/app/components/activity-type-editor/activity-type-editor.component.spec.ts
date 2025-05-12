import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeEditorComponent } from './activity-type-editor.component';

describe('ActivityTypeEditorComponent', () => {
  let component: ActivityTypeEditorComponent;
  let fixture: ComponentFixture<ActivityTypeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTypeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTypeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
