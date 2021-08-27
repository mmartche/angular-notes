import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeFotosNotasComponent } from './grade-fotos-notas.component';

describe('GradeFotosNotasComponent', () => {
  let component: GradeFotosNotasComponent;
  let fixture: ComponentFixture<GradeFotosNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeFotosNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeFotosNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
