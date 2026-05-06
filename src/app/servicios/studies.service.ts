import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Studies} from '../models/studies';

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  private apiServerUrl='https://porfolio-back-end-401734260571.europe-west1.run.app';

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
