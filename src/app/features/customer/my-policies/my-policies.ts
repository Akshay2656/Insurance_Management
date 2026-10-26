
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
      next: (response) => {
        console.log('Policy API response:', response);

        if (!response || response.success !== true) {
          this.policies = [];
          this.filteredPolicies = [];
          this.errorMessage =
            response?.message || 'Unable to load policies.';
          this.loading = false;
          return;
        }

        const allPolicies: Policy[] = Array.isArray(response.data)
          ? response.data
          : [];

        // Temporary: display all policies returned by the API.
        // Once authentication is connected, filter by the logged-in
        // customer's ID instead of displaying every customer's policies.
        this.policies = allPolicies;

        this.applyFilters();
        this.loading = false;

        console.log('Policies loaded:', this.policies);
      },

      error: (error) => {
        console.error('Unable to load policies:', error);
        console.error('HTTP status:', error.status);
        console.error('Error details:', error.message);

        this.errorMessage =
          error.status === 0
            ? 'Cannot connect to the Policy API. Check browser security, CORS, and the API URL.'
            : `Unable to load policies. HTTP status: ${error.status}.`;

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
