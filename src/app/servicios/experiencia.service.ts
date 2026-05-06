import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerUrl = 'https://porfolio-back-end-401734260571.europe-west1.run.app/experiencia';

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
