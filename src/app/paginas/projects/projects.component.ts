import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import {faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public experiencias: Experiencia[]=[];
  public experiencia= this.experienciaService.getExperiencia();
  public editExperiencia :Experiencia | undefined;
  public deleteExperiencia: Experiencia | undefined;

  islogged = false;
  isloggingFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  faTrash = faTrash;
  faPen = faPen;


    constructor(private experienciaService: ExperienciaService, private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getExperiencia();
    if(this.tokenService.getToken()) {
      this.islogged = true;
      this.isloggingFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
     this.authService
      .login(this.loginUsuario).subscribe( data => {
        this.islogged = true;
        this.isloggingFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate([''])
      }, error =>{
        this.islogged = false;
        this.isloggingFail = true;
        this.errMsj = error.error.mensaje;
      
      })
  }

  public getExperiencia():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response: Experiencia[])=>{
        this.experiencias=Response;
      },
      error:(error: HttpErrorResponse) =>{
        alert(error.message);
     }
    })
  }

  public onOpenModal(mode: string, experiencia?: Experiencia): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addExperienciaModal');
    } else if (mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#deleteExperienciaModal');
    } else if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#editExperienciaModal');
    }

    container?.appendChild(button);
    button.click();
  }

public onAddExperiencia(addForm: NgForm): void {
  document.getElementById('add-experiencia-form')?.click();
  this.experienciaService.addExperiencia(addForm.value).subscribe({
    next: (response: Experiencia) => {
      console.log(response);
      this.getExperiencia();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateExperiencia(experiencia: Experiencia){
  this.editExperiencia=experiencia;
  document.getElementById('add-experiencia-form')?.click();
  this.experienciaService.updateExperiencia(experiencia).subscribe({
    next: (response:Experiencia) =>{
      console.log(response);
      this.getExperiencia();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

public onDeleteExperiencia(idExp:number):void{
this.experienciaService.deleteExperiencia(idExp).subscribe({
    next: (response:void) =>{
      console.log(response);
      this.getExperiencia();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}


}
