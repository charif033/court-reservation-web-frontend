import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  private pageState = new BehaviorSubject<string>('');
  state$ = this.pageState.asObservable();

  pageStateChange(state: string) {
    this.pageState.next(state);
  }
}
