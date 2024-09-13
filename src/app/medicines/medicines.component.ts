import { Component, OnInit } from '@angular/core';
import { MedicineService, Medicine } from '../services/medicine.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-medicines',
  standalone: true, // Dodaj to
  imports: [CommonModule, HttpClientModule, RouterModule], // Dodaj wymagane moduły
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicines: Medicine[] = [];

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe(
      data => {
        this.medicines = data;
      },
      error => {
        console.error('Błąd podczas pobierania leków', error);
      }
    );
  }
}
