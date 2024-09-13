import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router'; // Dodaj ten import

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink], // Dodaj RouterLink do imports
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'] // Popraw nazwę właściwości
})
export class MainPageComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
