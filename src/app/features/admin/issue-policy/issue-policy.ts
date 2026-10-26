
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PolicyApiService } from '../../../core/services/policy-api';
import { PolicyRequest } from '../../../core/models/policy.model';

@Component({
  selector: 'app-issue-policy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './issue-policy.html',
  styleUrl: './issue-policy.css'
})
export class IssuePolicyComponent {

  policy: PolicyRequest = {
    quoteId: 0,
    customerId: 0,
    productId: 0,
    issueDate: '',
    effectiveDate: '',
    expiryDate: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private policyApiService: PolicyApiService) {}

  issuePolicy(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      this.policy.quoteId <= 0 ||
      this.policy.customerId <= 0 ||
      this.policy.productId <= 0 ||
      !this.policy.issueDate ||
      !this.policy.effectiveDate ||
      !this.policy.expiryDate
    ) {
      this.errorMessage = 'Please fill in all fields with valid values.';
      return;
    }

    if (this.policy.expiryDate <= this.policy.effectiveDate) {
      this.errorMessage = 'Expiry date must be after the effective date.';
      return;
    }

    this.loading = true;

    this.policyApiService.createPolicy(this.policy).subscribe({
      next: (response) => {
        this.successMessage =
          response.message || 'Policy created successfully.';
        this.loading = false;

        this.policy = {
          quoteId: 0,
          customerId: 0,
          productId: 0,
          issueDate: '',
          effectiveDate: '',
          expiryDate: ''
        };
      },
      error: (error) => {
        console.error('Error creating policy:', error);
        this.errorMessage =
          error.error?.message ||
          error.error?.error ||
          'Unable to create policy. Check the backend and entered details.';
        this.loading = false;
      }
    });
  }
}
