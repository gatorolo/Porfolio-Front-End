import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Studies} from '../models/studies';

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  private apiServerUrl='http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getStudies():Observable<Studies[]> {
    return this.http.get<Studies[]>(`${this.apiServerUrl}/educacion/all`);
  }

  public addStudies(studies: Studies):Observable<Studies>{
    return this.http.post<Studies>(`${this.apiServerUrl}/educacion/add`, studies);
  }

  public updateStudies(studies: Studies):Observable<Studies>{
    return this.http.put<Studies>(`${this.apiServerUrl}/educacion/update`,studies);
  }

  public deleteStudies(studiesId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/delete/${studiesId}`);
  }
}
