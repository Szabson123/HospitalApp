import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { TimeFormatPipe } from './time-format.pipe';

interface PrescriptionWithMedicines {
  id: number;
  quantity: number;
  dosingTime: string[];
  medicines: Medicine[];
}

interface Medicine {
  id: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  patientId: number;
}

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule, TimeFormatPipe], // Importowanie modułów potrzebnych do komponentu standalone
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Pobranie ID z URL-a
    if (userId) {
      this.userService.getUserById(userId).subscribe(response => {
        if (!response.isError) {
          this.user = response.value; // Przypisanie danych użytkownika do zmiennej
        } else {
          console.error('Error fetching user details:', response.message);
        }
      });
    }
  }
}
