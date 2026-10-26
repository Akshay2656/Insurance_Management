
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyApiService } from '../../../core/services/policy-api';
import { Policy } from '../../../core/models/policy.model';

@Component({
  selector: 'app-policy-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-register.html',
  styleUrl: './policy-register.css'
})
export class PolicyRegisterComponent implements OnInit {

  policies: Policy[] = [];
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
        this.policies = response.data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading policies:', error);
        this.errorMessage =
          'Unable to load policies. Please check the backend connection.';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replaceAll(' ', '-');
  }
}
