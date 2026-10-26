import { Routes } from '@angular/router';

import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard';
import { PolicyRegisterComponent } from './features/admin/policy-register/policy-register';
import { IssuePolicyComponent } from './features/admin/issue-policy/issue-policy';

import { CustomerDashboardComponent } from './features/customer/customer-dashboard/customer-dashboard';
import { MyPoliciesComponent } from './features/customer/my-policies/my-policies';
import { RenewalRequestComponent } from './features/customer/renewal-request/renewal-request';
import { CancellationRequestComponent } from './features/customer/cancellation-request/cancellation-request';

export const routes: Routes = [
  { path: '', redirectTo: 'customer/dashboard', pathMatch: 'full' },

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/policies', component: PolicyRegisterComponent },
  { path: 'admin/issue-policy', component: IssuePolicyComponent },

  { path: 'customer/dashboard', component: CustomerDashboardComponent },
  { path: 'customer/policies', component: MyPoliciesComponent },

  { path: 'customer/renewal-request', component: RenewalRequestComponent },

  { path: 'customer/cancellation-request', component: CancellationRequestComponent },
  { path: '**', redirectTo: 'customer/dashboard' }
];