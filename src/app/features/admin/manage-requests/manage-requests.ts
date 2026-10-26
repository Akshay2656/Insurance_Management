
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PolicyApiService,
  ServiceRequest
} from '../../../core/services/policy-api';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-requests.html',
  styleUrl: './manage-requests.css'
})
export class ManageRequestsComponent implements OnInit {

  requests: PolicyRequest[] = [];

  selectedType = 'ALL';
  selectedStatus = 'ALL';
  searchText = '';

  loading = false;
  processingRequestId: number | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(private policyApiService: PolicyApiService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.errorMessage = '';

    this.policyApiService.getAllCancellationRequests().subscribe({
      next: (response) => {
        if (!response || response.success !== true) {
          this.requests = [];
          this.errorMessage =
            response?.message || 'Unable to load cancellation requests.';
          this.loading = false;
          return;
        }

        const serviceRequests: ServiceRequest[] =
          Array.isArray(response.data) ? response.data : [];

        this.requests = serviceRequests.map(request => ({
          requestId: request.requestId,
          customerId: request.customerId,
          policyId: request.policyId,
          requestType: 'CANCELLATION',
          reason: request.cancellationReason || '',
          status: this.normalizeStatus(request.status),
          requestDate: request.requestDate
            ? request.requestDate.substring(0, 10)
            : ''
        }));

        this.loading = false;
      },

      error: (error) => {
        console.error('Unable to load cancellation requests:', error);
        this.errorMessage =
          error.status === 0
            ? 'Cannot connect to the Closure Service. Check its URL and CORS configuration.'
            : `Unable to load requests. HTTP status: ${error.status}.`;

        this.loading = false;
      }
    });
  }

  private normalizeStatus(status: string): 'PENDING' | 'APPROVED' | 'REJECTED' {
    const normalized = status?.toUpperCase();

    if (normalized === 'APPROVED') {
      return 'APPROVED';
    }

    if (normalized === 'REJECTED') {
      return 'REJECTED';
    }

    return 'PENDING';
  }

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
        String(request.customerId).includes(search) ||
        String(request.policyId).includes(search);

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
    if (this.processingRequestId !== null) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.processingRequestId = requestId;

    this.policyApiService.approveCancellationRequest(requestId).subscribe({
      next: (response) => {
        if (response?.success !== true) {
          this.errorMessage =
            response?.message || 'Unable to approve cancellation request.';
          this.processingRequestId = null;
          return;
        }

        this.successMessage = 'Cancellation request approved successfully.';
        this.processingRequestId = null;
        this.loadRequests();
      },

      error: (error) => {
        console.error('Unable to approve request:', error);
        this.errorMessage =
          `Unable to approve request. HTTP status: ${error.status}.`;
        this.processingRequestId = null;
      }
    });
  }

  rejectRequest(requestId: number): void {
    const reason = window.prompt('Enter the reason for rejection:');

    if (reason === null) {
      return;
    }

    if (!reason.trim()) {
      this.errorMessage = 'Please enter a rejection reason.';
      return;
    }

    if (this.processingRequestId !== null) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.processingRequestId = requestId;

    this.policyApiService
      .rejectCancellationRequest(requestId, reason.trim())
      .subscribe({
        next: (response) => {
          if (response?.success !== true) {
            this.errorMessage =
              response?.message || 'Unable to reject cancellation request.';
            this.processingRequestId = null;
            return;
          }

          this.successMessage = 'Cancellation request rejected successfully.';
          this.processingRequestId = null;
          this.loadRequests();
        },

        error: (error) => {
          console.error('Unable to reject request:', error);
          this.errorMessage =
            `Unable to reject request. HTTP status: ${error.status}.`;
          this.processingRequestId = null;
        }
      });
  }
}
