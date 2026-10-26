
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PolicyRequest {
  requestId: number;
  customerId: number;
  policyId: number;
  requestType: 'RENEWAL' | 'CANCELLATION';
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestDate: string;
}

@Component({
  selector: 'app-manage-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-requests.html',
  styleUrl: './manage-requests.css'
})
export class ManageRequestsComponent {

  // Temporary sample data for frontend development.
  requests: PolicyRequest[] = [
    {
      requestId: 1,
      customerId: 201,
      policyId: 1,
      requestType: 'RENEWAL',
      reason: 'I want to renew my existing insurance policy.',
      status: 'PENDING',
      requestDate: '2026-10-22'
    },
    {
      requestId: 2,
      customerId: 202,
      policyId: 2,
      requestType: 'CANCELLATION',
      reason: 'I no longer require this insurance coverage.',
      status: 'PENDING',
      requestDate: '2026-10-23'
    },
    {
      requestId: 3,
      customerId: 203,
      policyId: 3,
      requestType: 'RENEWAL',
      reason: 'My policy is approaching its expiry date.',
      status: 'APPROVED',
      requestDate: '2026-10-20'
    }
  ];

  selectedType = 'ALL';
  selectedStatus = 'ALL';
  searchText = '';

  get filteredRequests(): PolicyRequest[] {
    return this.requests.filter(request => {
      const matchesType =
        this.selectedType === 'ALL' ||
        request.requestType === this.selectedType;

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        request.status === this.selectedStatus;

      const search = this.searchText.trim().toLowerCase();

      const matchesSearch =
        search === '' ||
        request.requestId.toString().includes(search) ||
        request.customerId.toString().includes(search) ||
        request.policyId.toString().includes(search);

      return matchesType && matchesStatus && matchesSearch;
    });
  }

  get pendingCount(): number {
    return this.requests.filter(
      request => request.status === 'PENDING'
    ).length;
  }

  get approvedCount(): number {
    return this.requests.filter(
      request => request.status === 'APPROVED'
    ).length;
  }

  get rejectedCount(): number {
    return this.requests.filter(
      request => request.status === 'REJECTED'
    ).length;
  }

  approveRequest(requestId: number): void {
    const request = this.requests.find(
      item => item.requestId === requestId
    );

    if (request && request.status === 'PENDING') {
      request.status = 'APPROVED';
    }
  }

  rejectRequest(requestId: number): void {
    const request = this.requests.find(
      item => item.requestId === requestId
    );

    if (request && request.status === 'PENDING') {
      request.status = 'REJECTED';
    }
  }
}
