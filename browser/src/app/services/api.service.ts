import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface T {}

interface Payment {
  name: string;
  code: string;
  amount: number;
  grid: Array<T>;
}

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // get our grid and code generator
  getCode(params?: any): Observable<any> {
    return this.http.get(`${API_URL}/code`, {
      params: params,
    });
  }

  // create a new payment
  createPayment(params: Array<Payment>) {
    return this.http.post(`${API_URL}/payment`, params);
  }

  // get all our payments
  getAllPayments() {
    return this.http.get(`${API_URL}/codes`);
  }

  // delete a payment (not implemented yet on API backend)
  deletePayment(name: string) {
    return this.http.post(`${API_URL}/payment/${name}`, {});
  }
}
