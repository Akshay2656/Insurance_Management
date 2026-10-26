
import { Component, OnInit } from '@angular/core';
import { PolicyApiService } from '../../../core/services/policy-api';
import { Policy } from '../../../core/models/policy.model';

@Component({
  selector: 'app-renewal-request',
  standalone: true,
  imports: [],
  templateUrl: './renewal-request.html',
  styleUrl: './renewal-request.css'
})
export class RenewalRequestComponent implements OnInit {

  // Temporary demo customer ID.
  customerId = 201;

  policies: Policy[] = [];
  selectedPolicyId = '';
  reason = '';

  loading = false;
  submitting = false;
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

        // Show this demo customer's policies that may need renewal.
        this.policies = allPolicies.filter(policy =>
          policy.customerId === this.customerId &&
          ['ACTIVE', 'EXPIRED'].includes(policy.status?.toUpperCase())
        );

        this.loading = false;
      },
      error: (error) => {
        console.error('Unable to load policies:', error);
        this.errorMessage = 'Unable to load policies. Please try again.';
        this.loading = false;
      }
    });
  }

  submitRequest(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedPolicyId) {
      this.errorMessage = 'Please select a policy.';
      return;
    }

    this.errorMessage =
      'The renewal request API is not connected yet. Your request has not been submitted.';
  }
}
