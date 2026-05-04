import { Component, OnInit } from '@angular/core';
import { NgForm , FormsModule} from '@angular/forms';
import { Skills } from 'src/app/models/skills';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import {faPen } from '@fortawesome/free-solid-svg-icons';
import { SkillsService } from 'src/app/servicios/skills.service';

import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public skillss: Skills[]=[];
  public skills= this.skillsService.getSkills();
  public editSkills :Skills | undefined;
  public deleteSkills: Skills | undefined;

  islogged = false;
  isloggingFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  faTrash = faTrash;
  faPen = faPen

  constructor(private skillsService: SkillsService, private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getSkills();
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

  public getSkills():void{
    this.skillsService.getSkills().subscribe({
      next:(Response: Skills[])=>{
        this.skillss=Response;
      },
      error:(error: HttpErrorResponse) =>{
        alert(error.message);
     }
    })
  }

  public onOpenModal(mode: string, skills?: Skills): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addSkillsModal');
    } else if (mode === 'delete') {
      this.deleteSkills = skills;
      button.setAttribute('data-bs-target', '#deleteSkillsModal');
    } else if (mode === 'edit') {
      this.editSkills = skills;
      button.setAttribute('data-bs-target', '#editSkillsModal');
    }

    container?.appendChild(button);
    button.click();
  }

public onAddSkills(addForm: NgForm): void {
  document.getElementById('add-skills-form')?.click();
  this.skillsService.addSkills(addForm.value).subscribe({
    next: (response: Skills) => {
      console.log(response);
      this.getSkills();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateSkills(skills: Skills){
  this.editSkills=skills;
  document.getElementById('add-skills-form')?.click();
  this.skillsService.updateSkills(skills).subscribe({
    next: (response:Skills) =>{
      console.log(response);
      this.getSkills();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

public onDeleteSkills(idSkills:number):void{
this.skillsService.deleteSkills(idSkills).subscribe({
    next: (response:void) =>{
      console.log(response);
      this.getSkills();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}
}
