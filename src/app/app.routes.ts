import { Routes } from '@angular/router';
import { ReserveComponent } from './reserve/reserve.component'
import { HomeComponent } from './home/home.component';
import { StadiumInfoComponent } from './stadium-info/stadium-info.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: 'stadium-info', component: StadiumInfoComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'register', component: RegisterformComponent },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: '**', redirectTo: '' }
];
