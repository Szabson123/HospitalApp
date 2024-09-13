import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  phoneNumber: string;
  admission: string;
  discharge: string;
}

export interface UserResponse {
  value: User[];
  isError: boolean;
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://caretrack-production.up.railway.app/patient';

  constructor(private http: HttpClient) { }

  // Pobieranie listy użytkowników
  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.apiUrl);
  }

  addUser(user: User): Observable<any> {
    const payload = {
      PatientResult: user // Opakowanie danych w pole 'PatientResult'
    };
    return this.http.post<any>(this.apiUrl, payload);
  }
  
}
