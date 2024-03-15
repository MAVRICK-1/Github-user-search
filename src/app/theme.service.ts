import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme = this.darkTheme.asObservable();

  constructor() {
    // Check for saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setDarkTheme(true);
    }
  }

  toggleTheme() {
    this.setDarkTheme(!this.darkTheme.value);
  }

  private setDarkTheme(isDark: boolean) {
    this.darkTheme.next(isDark);
    // Store theme preference in local storage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}