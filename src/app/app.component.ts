import {Component, OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faHome, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {faGears} from '@fortawesome/free-solid-svg-icons';
import {faBuildingColumns} from '@fortawesome/free-solid-svg-icons';
import {faDiagramProject} from '@fortawesome/free-solid-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faUserSlash } from '@fortawesome/free-solid-svg-icons';
import {LoginUsuario } from './models/login-usuario';
import { Social } from './models/social';
import {AuthService } from './servicios/auth.service';
import {SocialService } from './servicios/social.service';
import {TokenService } from './servicios/token.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {


  public socials: Social[]=[];
  public social= this.socialService.getSocial();
  public editSocial : Social | undefined;
  public deleteSocial: Social | undefined;
   
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;
  faHome = faHome;
  faGears = faGears;
  faAddressCard = faAddressCard;
  faBuildingColumns = faBuildingColumns;
  faDiagramProject = faDiagramProject;
  faAt = faAt;
  faEnvelope = faEnvelope;
  faPen = faPen;
  faUser = faUser;
  faUserSlash = faUserSlash;

  isLogged = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  faTrash = faTrash


  constructor(private socialService: SocialService, private router:Router, private tokenService: TokenService, private authService: AuthService){}
 

  ngOnInit():void{
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
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSocialModal');
    } else if (mode === 'delete') {
      this.deleteSocial = social;
      button.setAttribute('data-target', '#deleteSocialModal');
    } else if (mode === 'edit') {
      this.editSocial = social;
      button.setAttribute('data-target', '#editSocialModal');
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
