import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDetalleComponent } from './genre-detalle.component';

describe('GenreDetalleComponent', () => {
  let component: GenreDetalleComponent;
  let fixture: ComponentFixture<GenreDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
