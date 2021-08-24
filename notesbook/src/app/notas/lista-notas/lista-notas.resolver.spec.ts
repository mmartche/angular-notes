import { TestBed } from '@angular/core/testing';

import { ListaNotasResolver } from './lista-notas.resolver';

describe('ListaNotasResolver', () => {
  let resolver: ListaNotasResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListaNotasResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
