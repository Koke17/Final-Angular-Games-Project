import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogameSearchComponent } from './videogame-search.component';

describe('VideogameSearchComponent', () => {
  let component: VideogameSearchComponent;
  let fixture: ComponentFixture<VideogameSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideogameSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
