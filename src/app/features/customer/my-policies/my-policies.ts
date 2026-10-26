
import { Component, OnInit } from '@angular/core';
import { PolicyApiService } from '../../../core/services/policy-api';
import { Policy } from '../../../core/models/policy.model';

@Component({
  selector: 'app-my-policies',
  standalone: true,
  imports: [],
  templateUrl: './my-policies.html',
  styleUrl: './my-policies.css'
})
export class MyPoliciesComponent implements OnInit {

  // Temporary demo customer ID.
  // Later, this will come from the logged-in customer.
  customerId = 201;

  policies: Policy[] = [];
  filteredPolicies: Policy[] = [];

  searchText = '';
  selectedStatus = 'ALL';

  loading = false;
  errorMessage = '';

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
          policy => policy.customerId === this.customerId
        );

        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Unable to load policies:', error);
        this.errorMessage = 'Unable to load your policies. Please try again.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredPolicies = this.policies.filter(policy => {
      const matchesSearch =
        !search ||
        policy.policyNumber?.toLowerCase().includes(search) ||
        String(policy.policyId).includes(search) ||
        String(policy.productId).includes(search);

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        policy.status?.toUpperCase() === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.applyFilters();
  }

  onStatusChange(value: string): void {
    this.selectedStatus = value;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedStatus = 'ALL';
    this.applyFilters();
  }
}
