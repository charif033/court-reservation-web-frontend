import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface userInfoCredential {
  memberId: number,
  fname: string,
  lname: string,
  email: string,
  role: string,
  balance: number,
  reservations: Array<{ courtNo: number, date: string, time: string }>
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:3000/api';
  private baseAuthUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  register(fname: string, lname: string, email: string, password: string) {
    const url = `${this.baseAuthUrl}/register`;
    return this.http.post<{ message: string }>(url, { fname, lname, email, password });
  }

  login(email: string, password: string) {
    const url = `${this.baseAuthUrl}/login`;
    return this.http.post(url, { email, password }, { withCredentials: true });
  }

  logout() {
    const url = `${this.baseAuthUrl}/logout`;
    return this.http.get(url, { withCredentials: true });
  }

  isLoggedIn() {
    const url = `${this.baseUrl}/isLoggedIn`;
    return this.http.get(url, { withCredentials: true });
  }

  topUp(memberId: number, amount: number) {
    const url = `${this.baseUrl}/topup`;
    return this.http.post<{ message: string }>(url, { memberId, amount }, { withCredentials: true });
  }

  reservation(memberId: number, courtNo: number, date: string, time: string) {
    const url = `${this.baseUrl}/reservation`;
    return this.http.post<{ message: string }>(url, { memberId, courtNo, date, time }, { withCredentials: true });
  }

  courtStatus(date: string) {
    const url = `${this.baseUrl}/courtStatus`;
    return this.http.post(url, { date });
  }

  userInfo() {
    const url = `${this.baseUrl}/userInfo`;
    return this.http.get<userInfoCredential[]>(url, { withCredentials: true });
  }

  transaction() {
    const url = `${this.baseUrl}/transaction`;
    return this.http.get(url);
  }

  reservationHistory() {
    const url = `${this.baseUrl}/reservationHistory`;
    return this.http.get(url);
  }

  postFeedback(name: string, email: string, memberId: number, feedback: string) {
    const url = `${this.baseUrl}/feedback`;
    return this.http.post(url, { name, email, memberId, feedback });
  }

  getFeedback() {
    const url = `${this.baseUrl}/feedback`;
    return this.http.get(url);
  }

  userLookup(memberId: number) {
    const url = `${this.baseUrl}/userLookup`;
    return this.http.post<{ fname: string, lname: string, balance: number }[]>(url, { memberId });
  }

  cancelReservation(id: string) {
    const url = `${this.baseUrl}/cancelReservation`;
    return this.http.post<{ message: string }>(url, { id }, { withCredentials: true });
  }


}
