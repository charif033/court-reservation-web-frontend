import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../api-service.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private apiService: ApiServiceService,
    private pageService: PageService
  ) { }

  active = '';
  islogin: any;
  userRole: string = '';
  ngOnInit() {
    this.pageService.state$.subscribe(state => {
      this.active = state;
    });
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
    this.apiService.userInfo().subscribe({
      next: (res: { [key: string]: any }) => {
        this.userRole = res[0].role
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        // console.log('fetch userInfo complete')
      }
    })
  }

  isDropdownOpen = false;
  isNavOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    const menuButton = document.getElementById('user-menu-button');
    if (!menuButton?.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  logout() {
    this.apiService.logout().subscribe(() => {
      window.location.href = '/';
    });
  }
}
