import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule,RouterLink , MatToolbarModule, MatIconModule, MatSlideToggleModule,MatProgressSpinnerModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  users: any[] = [];
  loading:boolean = false;
  typeAhead?: Subscription;
  @ViewChild('searchInput', { static: true }) searchInput?: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const searchObs = fromEvent(this.searchInput!.nativeElement, 'input').pipe(
      debounceTime(1000),
      filter((inputEvent: any) => inputEvent.target.value !== ''),
      switchMap((inputEvent: any) => {
        const searchUrl = `https://api.github.com/search/users?q=${inputEvent.target.value}`;
        this.loading = true;
        return ajax.getJSON(searchUrl);
      })
    );

    this.typeAhead = searchObs.subscribe((response: any) => {
      this.users = response.items;
      this.loading = false; // Hide loading spinner
    });
  }

  ngOnDestroy(): void {
    if (this.typeAhead) {
      this.typeAhead.unsubscribe();
    }
  }
}
