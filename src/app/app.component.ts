import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './input/input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjspractice';
}
