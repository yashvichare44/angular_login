import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/all`);
  }

  getBankingDataForId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/banking/${id}`);
  }

  getAddressDataForId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/address/${id}`);
  }

  getUsersWithDetails(): Observable<{ id: any; password: any; banking: any[]; address: any[]; }[]> {
    return this.getAllUsers().pipe(
      mergeMap(users => {
        const userDataObservables: Observable<any>[] = users.map(user => {
          const id = user.id;
          const banking$ = this.getBankingDataForId(id);
          const address$ = this.getAddressDataForId(id);

          return forkJoin([banking$, address$]).pipe(
            map(([banking, address]) => ({
              id,
              password: user.password, // Assuming password is needed here
              banking,
              address
            }))
          );
        });

        return forkJoin(userDataObservables);
      })
    );
  }
}
