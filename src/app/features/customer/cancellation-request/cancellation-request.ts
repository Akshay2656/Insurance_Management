
import { Component, OnInit } from '@angular/core';
import { PolicyApiService } from '../../../core/services/policy-api';
import { Policy } from '../../../core/models/policy.model';

@Component({
  selector: 'app-cancellation-request',
  standalone: true,
  imports: [],
  templateUrl: './cancellation-request.html',
  styleUrl: './cancellation-request.css'
})
export class CancellationRequestComponent implements OnInit {

  customerId = 201;

  policies: Policy[] = [];
  selectedPolicyId = '';
  reason = '';

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private policyApiService: PolicyApiService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.loading = true;
    this.errorMessage = '';

    this.policyApiService.getAllPolicies().subscribe({
      next: (response: any) => {
        const allPolicies: Policy[] = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        this.policies = allPolicies.filter(
          policy =>
            policy.customerId === this.customerId &&
            ['ACTIVE', 'PENDING'].includes(
              policy.status?.toUpperCase()
            )
        );

        this.loading = false;
      },
      error: (error) => {
        console.error('Unable to load policies:', error);
        this.errorMessage =
          'Unable to load policies. Please try again.';
        this.loading = false;
      }
    });
  }

  submitRequest(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.selectedPolicyId) {
      this.errorMessage = 'Please select a policy.';
      return;
    }

    if (!this.reason.trim()) {
      this.errorMessage =
        'Please provide a reason for cancellation.';
      return;
    }

    // The cancellation request API is not connected yet.
    this.errorMessage =
      'The cancellation request API is not connected yet. Your request has not been submitted.';
  }
}
