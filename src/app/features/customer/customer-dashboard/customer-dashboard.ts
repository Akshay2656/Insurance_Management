
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PolicyApiService } from '../../../core/services/policy-api';
import { Policy } from '../../../core/models/policy.model';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class CustomerDashboardComponent implements OnInit {

  // Temporary demo customer ID.
  // Replace this with the logged-in customer's ID when authentication is connected.
  customerId = 101;

  totalPolicies = 0;
  activePolicies = 0;
  pendingPolicies = 0;
  expiredPolicies = 0;

  loading = false;
  errorMessage = '';

  constructor(private policyApiService: PolicyApiService) {}

  ngOnInit(): void {
    this.loadCustomerPolicies();
  }

  loadCustomerPolicies(): void {
    this.loading = true;
    this.errorMessage = '';

    this.policyApiService.getAllPolicies().subscribe({
      next: (response) => {
        if (!response || response.success !== true) {
          this.errorMessage =
            response?.message || 'Unable to load policies.';
          this.loading = false;
          return;
        }

        const policies: Policy[] = Array.isArray(response.data)
          ? response.data
          : [];

        // Display policies belonging only to this demo customer.
        const customerPolicies = policies.filter(
          policy => Number(policy.customerId) === this.customerId
        );

        this.totalPolicies = customerPolicies.length;

        this.activePolicies = customerPolicies.filter(
          policy => policy.status?.toUpperCase() === 'ACTIVE'
        ).length;

        this.pendingPolicies = customerPolicies.filter(
          policy =>
            ['PENDING', 'PENDING_PAYMENT'].includes(
              policy.status?.toUpperCase() ?? ''
            )
        ).length;

        this.expiredPolicies = customerPolicies.filter(
          policy => policy.status?.toUpperCase() === 'EXPIRED'
        ).length;

        this.loading = false;

        console.log('Customer policies:', customerPolicies);
        console.log('Total policies:', this.totalPolicies);
        console.log('Active policies:', this.activePolicies);
        console.log('Pending policies:', this.pendingPolicies);
        console.log('Expired policies:', this.expiredPolicies);
      },

      error: (error) => {
        console.error('Unable to load policies:', error);

        this.errorMessage =
          error.status === 0
            ? 'Cannot connect to the Policy API. Check CORS and the API URL.'
            : `Unable to load policies. HTTP status: ${error.status}.`;

        this.loading = false;
      }
    });
  }
}
