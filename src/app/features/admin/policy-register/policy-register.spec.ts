import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyRegister } from './policy-register';

describe('PolicyRegister', () => {
  let component: PolicyRegister;
  let fixture: ComponentFixture<PolicyRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyRegister]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PolicyRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
