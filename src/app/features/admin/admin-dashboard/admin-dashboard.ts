
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PolicyApiService } from '../../../core/services/policy-api';
import { Policy } from '../../../core/models/policy.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {

  totalPolicies = 0;
  activePolicies = 0;
  pendingPolicies = 0;
  expiredPolicies = 0;

  constructor(private policyApiService: PolicyApiService) {}

  ngOnInit(): void {
    this.loadPolicyCounts();
  }

  loadPolicyCounts(): void {
    this.policyApiService.getAllPolicies().subscribe({
      next: (response) => {
        if (!response || response.success !== true ||
            !Array.isArray(response.data)) {
          return;
        }

        const policies: Policy[] = response.data;

        this.totalPolicies = policies.length;

        this.activePolicies = policies.filter(
          policy => policy.status?.toUpperCase() === 'ACTIVE'
        ).length;

        this.pendingPolicies = policies.filter(
          policy => policy.status?.toUpperCase() === 'PENDING'
        ).length;

        this.expiredPolicies = policies.filter(
          policy => policy.status?.toUpperCase() === 'EXPIRED'
        ).length;
      },

      error: (error) => {
        console.error('Unable to load dashboard policy counts:', error);
      }
    });
  }

  quickLinks = [
    {
      title: 'Policy Register',
      description: 'View and manage issued policies.',
      route: '/admin/policies',
      icon: '▤'
    },
    {
      title: 'Issue New Policy',
      description: 'Create a new policy record.',
      route: '/admin/issue-policy',
      icon: '+'
    },
    {
      title: 'Manage Requests',
      description: 'Review renewal and cancellation requests.',
      route: '/admin/requests',
      icon: '☷'
    }
  ];
}
