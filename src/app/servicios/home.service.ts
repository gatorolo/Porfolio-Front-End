import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 
  private apiServerUrl='http://localhost:8080'

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
