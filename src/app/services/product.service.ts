import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API = "http://localhost:3000/products";

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.API);
  }

  get(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.API, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
