import { Component } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  topupForm: FormGroup;
  courtStatus: any
  transaction: any
  reservation: any
  userLookup: any = {}
  feedback: any
  inputDate: string = this.today()
  today(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}`;
    return defaultDate
  };

  constructor(private apiService: ApiServiceService) {
    this.topupForm = new FormGroup({
      memberId: new FormControl(''),
      amount: new FormControl('')
    })
  }

  ngOnInit() {
    this.apiService.transaction().subscribe({
      next: (res) => {
        this.transaction = res
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch transaction complete')
      }
    })
    this.apiService.reservationHistory().subscribe({
      next: (res) => {
        this.reservation = res
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch reservation complete')
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
    this.apiService.getFeedback().subscribe({
      next: (res) => {
        this.feedback = res
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('fetch feedback complete')
      }
    })
  }

  userlookup() {
    const memberId = this.topupForm.get('memberId')?.value
    this.apiService.userLookup(memberId).subscribe({
      next: (res) => {
        this.userLookup = res[0]
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch userLookup complete')
      }
    })
  }

  topup() {
    const memberId = this.topupForm.get('memberId')?.value
    const amount = this.topupForm.get('amount')?.value
    this.apiService.topUp(memberId, amount).subscribe({
      next: (res) => {
        alert('server message: ' + res.message)
        document.location.reload()
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch topUp complete')
      }
    })
  }

  cancelReservation(id: string) {
    console.log(id)
    this.apiService.cancelReservation(id).subscribe({
      next: (res) => {
        alert('server message: ' + res.message)
        document.location.reload()
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch cancelReservation complete')
      }
    })
  }

  dateChange(date: string): void {
    this.apiService.courtStatus(date).subscribe({
      next: (res) => {
        console.log(res)
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
