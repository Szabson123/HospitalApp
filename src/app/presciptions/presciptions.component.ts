import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrescriptionService, Prescription } from '../services/prescription.service';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './presciptions.component.html',
  styleUrls: ['./presciptions.component.css']
})
export class PrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.prescriptionService.getPrescriptions().subscribe(response => {
      if (!response.isError) {
        this.prescriptions = response.value;
      } else {
        console.error('Error fetching prescriptions:', response.message);
      }
    });
  }
}
