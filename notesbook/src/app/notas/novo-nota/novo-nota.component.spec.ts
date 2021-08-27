import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoNotaComponent } from './novo-nota.component';

describe('NovoNotaComponent', () => {
  let component: NovoNotaComponent;
  let fixture: ComponentFixture<NovoNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoNotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
