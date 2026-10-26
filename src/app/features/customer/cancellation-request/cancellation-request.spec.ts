import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancellationRequest } from './cancellation-request';

describe('CancellationRequest', () => {
  let component: CancellationRequest;
  let fixture: ComponentFixture<CancellationRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationRequest]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CancellationRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
