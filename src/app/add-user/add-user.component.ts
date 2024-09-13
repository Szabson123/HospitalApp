import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9-]+$/)]],
      admission: ['', [Validators.required]],
      discharge: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        age: this.userForm.value.age,
        weight: this.userForm.value.weight,
        phoneNumber: this.userForm.value.phoneNumber,
        admission: this.userForm.value.admission,
        discharge: this.userForm.value.discharge
      };
  
      // Przesłanie nowego użytkownika
      this.userService.addUser(newUser).subscribe(
        response => {
          console.log('Użytkownik dodany', response);
          this.successMessage = 'Użytkownik został pomyślnie dodany.';
          this.errorMessage = '';
          this.userForm.reset();
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        error => {
          console.error('Błąd podczas dodawania użytkownika', error);
          this.errorMessage = 'Wystąpił błąd podczas dodawania użytkownika.';
          this.successMessage = '';
        }
      );
    } else {
      console.log('Formularz jest niepoprawny');
    }
  }
}
