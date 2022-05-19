import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineSearchComponent } from './engine-search.component';

describe('EngineSearchComponent', () => {
  let component: EngineSearchComponent;
  let fixture: ComponentFixture<EngineSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
