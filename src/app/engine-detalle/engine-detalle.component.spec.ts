import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineDetalleComponent } from './engine-detalle.component';

describe('EngineDetalleComponent', () => {
  let component: EngineDetalleComponent;
  let fixture: ComponentFixture<EngineDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
