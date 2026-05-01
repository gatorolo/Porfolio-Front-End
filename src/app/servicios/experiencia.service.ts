import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerUrl = 'http://localhost:8080/experiencia';

  constructor(private http: HttpClient) { }

  public getExperiencia(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/all`);
  }

  public addExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(`${this.apiServerUrl}/add`, experiencia);
  }

  public updateExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(`${this.apiServerUrl}/update`, experiencia);
  }

  public deleteExperiencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
}
