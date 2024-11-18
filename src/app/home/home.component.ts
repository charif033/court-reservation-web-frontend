import { Component, viewChild } from '@angular/core';
import { LoginformComponent } from "../loginform/loginform.component";
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginformComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private apiService: ApiServiceService,
    private pageService: PageService
  ) { }

  courtStatus: any;
  islogin: any;
  userInfo: any;
  ngOnInit() {
    this.pageService.pageStateChange('home');
    this.apiService.isLoggedIn().subscribe({
      next: (res) => {
        this.islogin = res
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch isLoggedIn complete')
      }
    })
    this.apiService.courtStatus(this.today()).subscribe({
      next: (res) => {
        this.courtStatus = res
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch courtStatus complete')
      }
    })
    this.apiService.userInfo().subscribe({
      next: (res: { [index: string]: any }) => {
        this.userInfo = res[0]
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch userInfo complete')
      }
    })
  }

  today() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}`;
    return defaultDate
  };

  inputDate: string = this.today()
  dateChange(date: string): void {
    this.apiService.courtStatus(date).subscribe({
      next: (res) => {
        this.courtStatus = res
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('fetch courtStatus complete')
      }
    })
  }

}
