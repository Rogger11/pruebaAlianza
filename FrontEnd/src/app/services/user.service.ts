import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basUrl = "http://localhost:8080/api"

  constructor(private httpClient: HttpClient) {

  }

  getApi(): any {
    return this.basUrl;
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.basUrl}/clientes`);
  }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}/clientes`, user);
  }

  getUserBySharedKey(sharedKey: string): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.basUrl}/clientes/bySharedKey?sharedKey=${sharedKey}`);
  }
} 
