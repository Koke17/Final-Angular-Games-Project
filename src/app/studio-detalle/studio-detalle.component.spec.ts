import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioDetalleComponent } from './studio-detalle.component';

describe('StudioDetalleComponent', () => {
  let component: StudioDetalleComponent;
  let fixture: ComponentFixture<StudioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
