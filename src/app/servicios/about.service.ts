import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { About } from '../models/about';

@Injectable({
  providedIn: 'root',
})

export class AboutService {
  private apiServerUrl='http://localhost:8080'

  constructor(private http: HttpClient) {}

  public getAbout(): Observable<About[]> {
    return this.http.get<About[]>(`${this.apiServerUrl}/about/all`);
  }

  public addAbout(about: About):Observable<About>{
    return this.http.post<About>(`${this.apiServerUrl}/about/add`, about);
  }

  public updateAbout(about: About): Observable<About> {
    return this.http.put<About>(`${this.apiServerUrl}/about/update`, about);
  }

  public deleteAbout(aboutId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/about/delete/${aboutId}`
    );
  }
}
