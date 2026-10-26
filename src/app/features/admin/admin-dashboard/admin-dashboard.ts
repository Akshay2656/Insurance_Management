
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent {

  totalPolicies = 0;
  activePolicies = 0;
  pendingPolicies = 0;
  expiredPolicies = 0;

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
