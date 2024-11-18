import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {

  registerForm: FormGroup;

  constructor(private apiService: ApiServiceService) {
    this.registerForm = new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      reinput_password: new FormControl('')
    });
  }

  register() {
    if (this.registerForm.get('password')?.value !== this.registerForm.get('reinput_password')?.value) {
      alert('password does not match');
      return;
    }
    if (this.registerForm.get('email')?.value === ''
      || this.registerForm.get('fame')?.value === ''
      || this.registerForm.get('lname')?.value === ''
      || this.registerForm.get('password')?.value === '') {
      alert('please fill in all fields');
      return;
    }
    this.apiService.register(
      this.registerForm.get('fname')?.value,
      this.registerForm.get('lname')?.value,
      this.registerForm.get('email')?.value,
      this.registerForm.get('password')?.value
    ).subscribe({
      next: (res) => {
        console.log(res);
        alert('server message: ' + res.message);
        document.location.replace('/');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
