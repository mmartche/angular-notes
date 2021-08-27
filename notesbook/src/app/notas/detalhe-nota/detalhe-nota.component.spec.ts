import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheNotaComponent } from './detalhe-nota.component';

describe('DetalheNotaComponent', () => {
  let component: DetalheNotaComponent;
  let fixture: ComponentFixture<DetalheNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
