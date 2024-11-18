import { Component } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-stadium-info',
  standalone: true,
  imports: [],
  templateUrl: './stadium-info.component.html',
  styleUrl: './stadium-info.component.css'
})
export class StadiumInfoComponent {

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.pageStateChange('stadium');
  }

}
