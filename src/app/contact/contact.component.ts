import { Component } from '@angular/core';
import { PageService } from '../page.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  feedbackForm: FormGroup;

  constructor(
    private pageService: PageService,
    private apiService: ApiServiceService
  ) {
    this.feedbackForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      memberId: new FormControl(0),
      feedback: new FormControl('')
    });
  }

  ngOnInit() {
    this.pageService.pageStateChange('contact');
  }

  feedbackSend() {
    console.log(this.feedbackForm.value);
    const name = this.feedbackForm.get('name')?.value;
    const email = this.feedbackForm.get('email')?.value;
    const memberId = this.feedbackForm.get('memberId')?.value;
    const feedback = this.feedbackForm.get('feedback')?.value;
    this.apiService.postFeedback(name, email, memberId, feedback).subscribe(
      (res) => {
        console.log(res);
        alert('feedback sent');
        this.feedbackForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
