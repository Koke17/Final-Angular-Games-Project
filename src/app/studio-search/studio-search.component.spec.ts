import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioSearchComponent } from './studio-search.component';

describe('StudioSearchComponent', () => {
  let component: StudioSearchComponent;
  let fixture: ComponentFixture<StudioSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
