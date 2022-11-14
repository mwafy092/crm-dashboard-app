import { NavComponent } from './nav.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('navbar test', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavComponent],
    })
  );
  it('mount and check for primary links', () => {
    cy.mount(NavComponent);
    cy.get('[data-cy=loginLink]').should('have.text', 'Login');
    cy.get('[data-cy=registerLink]').should('have.text', 'Register');
  });
});
