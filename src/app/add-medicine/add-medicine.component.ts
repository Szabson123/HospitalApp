import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedicineService, Medicine } from '../services/medicine.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-medicine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {
  medicineForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private router: Router
  ) {
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      expirationDate: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.medicineForm.valid) {
      const newMedicine: Medicine = {
        name: this.medicineForm.value.name,
        quantity: this.medicineForm.value.quantity,
        expirationDate: this.medicineForm.value.expirationDate,
      };

      this.medicineService.addMedicine(newMedicine).subscribe(
        response => {
          console.log('Lek dodany', response);
          this.successMessage = 'Lek został pomyślnie dodany.';
          this.errorMessage = '';
          this.medicineForm.reset();
          setTimeout(() => {
            this.router.navigate(['/medicines']);
          }, 2000);
        },
        error => {
          console.error('Błąd podczas dodawania leku', error);
          this.errorMessage = 'Wystąpił błąd podczas dodawania leku.';
          this.successMessage = '';
        }
      );
    } else {
      console.log('Formularz jest niepoprawny');
    }
  }
}
