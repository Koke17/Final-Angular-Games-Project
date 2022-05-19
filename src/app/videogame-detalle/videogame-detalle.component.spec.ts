import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogameDetalleComponent } from './videogame-detalle.component';

describe('VideogameDetalleComponent', () => {
  let component: VideogameDetalleComponent;
  let fixture: ComponentFixture<VideogameDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideogameDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogameDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
