
import {
Component
} from "@angular/core";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  
  RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Insurance Management System';

  selectedRole: 'ADMIN' | 'CUSTOMER' = 'CUSTOMER';

  setRole(role: 'ADMIN' | 'CUSTOMER'): void {
    this.selectedRole = role;
  }
}
