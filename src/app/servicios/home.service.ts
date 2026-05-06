import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 
  private apiServerUrl='https://porfolio-back-end-401734260571.europe-west1.run.app'

  constructor(private http: HttpClient) { }

  public getUsuarios():Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.apiServerUrl}/usuario/id/1`);
  }

  public addUsuarios(usuarios: Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(`${this.apiServerUrl}/usuario/add`, usuarios);
  }

  public updateUsuarios(usuarios: Usuarios):Observable<Usuarios>{
    return this.http.put<Usuarios>(`${this.apiServerUrl}/usuario/update`, usuarios);
  }

  public deleteUsuarios(usuariosId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/usuario/delete/${usuariosId}`);
  }
}
