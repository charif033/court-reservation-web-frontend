import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userInfo: any

  constructor(
    private apiService: ApiServiceService
  ) { }

  ngOnInit() {
    this.apiService.userInfo().subscribe({
      next: (res: { [index: string]: any }) => {
        this.userInfo = res[0];
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch userInfo complete')
      }
    })
  }
}
