import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Social } from 'src/app/models/social';
import { AuthService } from 'src/app/servicios/auth.service';
import { SocialService } from 'src/app/servicios/social.service';
import { TokenService } from 'src/app/servicios/token.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  
  public socials: Social[]=[];
  public social= this.socialService.getSocial();
  public editSocial : Social | undefined;
  public deleteSocial: Social | undefined;
   
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;
  faPen = faPen;
  faTwitter = faTwitter;
  faWhatsapp = faWhatsapp;

  isLogged = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  faTrash = faTrash

  constructor( private socialService: SocialService, private router:Router, private tokenService: TokenService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getSocial();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else {
      this.isLogged = false;
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
     this.authService
      .login(this.loginUsuario).subscribe( data => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['']);
        this.isLogged = true;
       
      }, error =>{
        this.isLogged= false;
        this.errMsj = error.error.mensaje;
      
      })
  }

  onLogOut():void {
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/paginas/login']);
    this.isLogged = true;
  }

  public getSocial():void{
    this.socialService.getSocial().subscribe({
      next:(Response: Social[])=>{
        this.socials=Response;
      },
      error:(error: HttpErrorResponse) =>{
        alert(error.message);
     }
    })
  }
   //modal
  public onOpenModal(mode: string, social?: Social): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addSocialModal');
    } else if (mode === 'delete') {
      this.deleteSocial = social;
      button.setAttribute('data-bs-target', '#deleteSocialModal');
    } else if (mode === 'edit') {
      this.editSocial = social;
      button.setAttribute('data-bs-target', '#editSocialModal');
    }

    container?.appendChild(button);
    button.click();
  }

public onAddSocial(addForm: NgForm): void {
  document.getElementById('add-social-form')?.click();
  this.socialService.addSocial(addForm.value).subscribe({
    next: (response: Social) => {
      console.log(response);
      this.getSocial();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateSocial(social: Social){
  this.editSocial=social;
  document.getElementById('add-social-form')?.click();
  this.socialService.updateSocial(social).subscribe({
    next: (Response:Social) =>{
      console.log(Response);
      this.getSocial();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

public onDeleteSocial(idSoc:number):void{
this.socialService.deleteSocial(idSoc).subscribe({
    next: (response:void) =>{
      console.log(Response);
      this.getSocial();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

}
