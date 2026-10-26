
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

  // Demo customer ID. We will replace this with the
  // logged-in customer's ID when authentication is connected.
  customerId = 201;

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
      next: (response: any) => {
        // Supports an ApiResponse containing data or a direct array.
        const policies: Policy[] = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        // Show only policies belonging to this customer.
        const customerPolicies = policies.filter(
          policy => policy.customerId === this.customerId
        );

        this.totalPolicies = customerPolicies.length;

        this.activePolicies = customerPolicies.filter(
          policy => policy.status?.toUpperCase() === 'ACTIVE'
        ).length;

        this.pendingPolicies = customerPolicies.filter(
          policy => policy.status?.toUpperCase() === 'PENDING'
            || policy.status?.toUpperCase() === 'PENDING_PAYMENT'
        ).length;

        this.expiredPolicies = customerPolicies.filter(
          policy => policy.status?.toUpperCase() === 'EXPIRED'
        ).length;

        this.loading = false;
      },
      error: (error) => {
        console.error('Unable to load policies:', error);
        this.errorMessage = 'Unable to load policies. Please try again.';
        this.loading = false;
      }
    });
  }
}
