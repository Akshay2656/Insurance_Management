
export interface Policy {
  policyId: number;
  policyNumber: string;
  quoteId: number;
  customerId: number;
  productId: number;
  issueDate: string;
  effectiveDate: string;
  expiryDate: string;
  status: string;
}

export interface PolicyRequest {
  quoteId: number;
  customerId: number;
  productId: number;
  issueDate: string;
  effectiveDate: string;
  expiryDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

export interface Endorsement {
  endorsementId: number;
  policyId: number;
  endorsementType: string;
  oldValue?: string;
  newValue?: string;
  approvalStatus: string;
}

export interface ServiceRequest {
  requestId: number;
  policyId: number;
  customerId: number;
  requestType: 'RENEWAL' | 'CANCELLATION';
  reason?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  requestDate: string;
}
