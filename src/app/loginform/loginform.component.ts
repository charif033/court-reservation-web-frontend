import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormsModule } from '@angular/forms';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})

export class LoginformComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiServiceService) { }


  login({ email, password }: LoginCredentials) {
    this.apiService.login(email, password).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
        document.location.reload();
      }
    })
  }

}
