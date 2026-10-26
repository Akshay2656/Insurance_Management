
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ApiResponse,
  Policy,
  PolicyRequest
} from '../models/policy.model';

export interface ServiceRequest {
  requestId: number;
  requestNumber: string;
  policyId: number;
  customerId: number;
  requestType: string;
  requestDate: string;
  status: string;
  rejectionReason?: string;
  cancellationReason?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyApiService {

  private readonly baseUrl =
    'http://13.60.45.62:8081/api/v1/policies';

  private readonly closureUrl =
    'http://16.171.152.177:8083/api/v1/cancellations';

  constructor(private http: HttpClient) {}

  // Policy APIs

  getAllPolicies(): Observable<ApiResponse<Policy[]>> {
    return this.http.get<ApiResponse<Policy[]>>(this.baseUrl);
  }

  getPolicyById(policyId: number): Observable<ApiResponse<Policy>> {
    return this.http.get<ApiResponse<Policy>>(
      `${this.baseUrl}/${policyId}`
    );
  }

  createPolicy(request: PolicyRequest): Observable<ApiResponse<Policy>> {
    return this.http.post<ApiResponse<Policy>>(
      this.baseUrl,
      request
    );
  }

  deletePolicy(policyId: number): Observable<ApiResponse<unknown>> {
    return this.http.delete<ApiResponse<unknown>>(
      `${this.baseUrl}/${policyId}`
    );
  }

  // Cancellation APIs

  getAllCancellationRequests():
    Observable<ApiResponse<ServiceRequest[]>> {
    return this.http.get<ApiResponse<ServiceRequest[]>>(
      this.closureUrl
    );
  }

  approveCancellationRequest(
    requestId: number
  ): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(
      `${this.closureUrl}/${requestId}/approve`,
      {}
    );
  }

  rejectCancellationRequest(
    requestId: number,
    reason: string
  ): Observable<ApiResponse<string>> {
    const params = new HttpParams().set('reason', reason);

    return this.http.put<ApiResponse<string>>(
      `${this.closureUrl}/${requestId}/reject`,
      {},
      { params }
    );
  }
}
