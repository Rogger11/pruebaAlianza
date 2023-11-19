import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private api = this.userService.getApi();

  constructor(private userService: UserService, private httpClient: HttpClient) { }


  exportToCsv(data: any[], fileName: string): void {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName + '.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  
  advancedSearch(criteria: any): Observable<User[]> {
    console.log(criteria);
    return this.httpClient.post<User[]>(`${this.api}/clientes/advanced-search`, criteria);
  }
}
