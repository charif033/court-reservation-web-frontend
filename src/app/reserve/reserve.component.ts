import { Component } from '@angular/core';
import { PageService } from '../page.service';
import { ApiServiceService } from '../api-service.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface timeIndexCredential {
  [key: string]: string
}

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {

  courtStatus: any;
  islogin: any;
  userInfo: any;
  today(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}`;
    return defaultDate
  };
  reservationForm: FormGroup

  constructor(
    private apiService: ApiServiceService,
    private pageService: PageService
  ) {
    this.reservationForm = new FormGroup({
      inputDate: new FormControl(this.today()),
      courtNoandTimeIndex: new FormControl(''),
      memberId: new FormControl(0)
    })
  }

  ngOnInit() {
    this.pageService.pageStateChange('reserve');
    this.apiService.isLoggedIn().subscribe({
      next: (res) => {
        this.islogin = res
        if (!this.islogin) {
          document.location.replace('/')
        }
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
        this.reservationForm.get('memberId')?.setValue(this.userInfo.memberId)
        this.reservationForm.get('memberId')?.disable
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch userInfo complete')
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

  reservation() {
    if (this.reservationForm.get('courtNoandTimeIndex')?.value === '') {
      return alert('please select court and time')
    }
    const timeIndex: timeIndexCredential = {
      "0": "15:00",
      "1": "16:00",
      "2": "17:00",
      "3": "18:00",
      "4": "19:00",
      "5": "20:00",
      "6": "21:00",
    }
    const memberId = this.reservationForm.get('memberId')?.value
    const inputDate = this.reservationForm.get('inputDate')?.value
    const courtNoandTimeIndex = this.reservationForm.get('courtNoandTimeIndex')?.value

    const courtNo = Number(courtNoandTimeIndex.split(' ')[0])
    const getTimeIndex = courtNoandTimeIndex.split(' ')[1]
    const time = timeIndex[getTimeIndex]

    console.log({ memberId, courtNo, inputDate, time })
    this.apiService.reservation(memberId, courtNo, inputDate, time).subscribe({
      next: (res) => {
        console.log(res)
        alert('server message: ' + res.message);
        document.location.reload();
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('fetch reservation complete')
      }
    })
  }


}
