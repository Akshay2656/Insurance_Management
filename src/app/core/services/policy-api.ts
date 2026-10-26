
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ApiResponse,
  Policy,
  PolicyRequest
} from '../models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyApiService {

  private readonly baseUrl = 'http://localhost:8081/api/v1/policies';

  constructor(private http: HttpClient) {}

  // Get all policies
  getAllPolicies(): Observable<ApiResponse<Policy[]>> {
    return this.http.get<ApiResponse<Policy[]>>(this.baseUrl);
  }

  // Get policy by ID
  getPolicyById(policyId: number): Observable<ApiResponse<Policy>> {
    return this.http.get<ApiResponse<Policy>>(
      `${this.baseUrl}/${policyId}`
    );
  }

  // Create a policy
  createPolicy(request: PolicyRequest): Observable<ApiResponse<Policy>> {
    return this.http.post<ApiResponse<Policy>>(
      this.baseUrl,
      request
    );
  }

  // Delete a policy
  deletePolicy(policyId: number): Observable<ApiResponse<unknown>> {
    return this.http.delete<ApiResponse<unknown>>(
      `${this.baseUrl}/${policyId}`
    );
  }
}
