import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'https://porfolio-back-end-401734260571.europe-west1.run.app/auth/';

  constructor(private httpclient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario):Observable<any> {
    return this.httpclient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpclient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }

  public resetPassword(resetDto: any): Observable<any> {
    return this.httpclient.post<any>(this.authURL + 'reset-password', resetDto);
  }
}

