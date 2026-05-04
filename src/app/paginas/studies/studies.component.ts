import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Studies } from 'src/app/models/studies';
import { StudiesService } from 'src/app/servicios/studies.service';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import {faPen } from '@fortawesome/free-solid-svg-icons';






@Component ({
    selector: 'app-studies',
    templateUrl: './studies.component.html',
    styleUrls: ['./studies.component.css']
})



  export class StudiesComponent implements OnInit {
  

  public studiess:Studies[]=[];
  public Studies= this.studiesService.getStudies();
  public editEducation:Studies | undefined;
  public deleteStudy:Studies | undefined;


  islogged = false;
  isloggingFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  faPen = faPen;
  faTrash = faTrash
  

    constructor(private studiesService: StudiesService, private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getStudiess();
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

  public getStudiess():void{
    this.studiesService.getStudies().subscribe({
      next:(Response: Studies[])=>{
        this.studiess=Response;
      },
      error:(error: HttpErrorResponse) =>{
        alert(error.message);
     }
    })
  }

  public onOpenModal(mode: string, studies?: Studies): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEducationModal');
    } else if (mode === 'delete') {
      this.deleteStudy = studies;
      button.setAttribute('data-bs-target', '#deleteEducationModal');
    } else if (mode === 'edit') {
      this.editEducation = studies;
      button.setAttribute('data-bs-target', '#editEducationModal');
    }

    container?.appendChild(button);
    button.click();
  }

public onAddEducation(addForm: NgForm): void {
  document.getElementById('add-education-form')?.click();
  this.studiesService.addStudies(addForm.value).subscribe({
    next: (response: Studies) => {
      console.log(response);
      this.getStudiess();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateEducation(studies: Studies){
  this.editEducation=studies;
  document.getElementById('add-education-form')?.click();
  this.studiesService.updateStudies(studies).subscribe({
    next: (response:Studies) =>{
      console.log(response);
      this.getStudiess();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

public onDeleteEducation(ideEdu:number):void{
this.studiesService.deleteStudies(ideEdu).subscribe({
    next: (response:void) =>{
      console.log(response);
      this.getStudiess();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

}


