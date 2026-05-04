import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { HomeService } from 'src/app/servicios/home.service';
import { NgForm , FormsModule} from '@angular/forms';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

    public usuario: Usuarios | undefined;
    public editUsuarios : Usuarios | undefined;
    public deleteUsuarios: Usuarios | undefined;
    public usuarios= this.homeService.getUsuarios();
    
  faPen = faPen;
  islogged = false;
  isloggingFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;


    constructor(private homeService: HomeService, private tokenService: TokenService, private authService: AuthService, private router: Router) { }

    
  ngOnInit(): void {
   this.getUsuarios();

   if(this.tokenService.getToken()) {
    this.islogged = true;
    this.isloggingFail = false;
    this.roles = this.tokenService.getAuthorities();
  }

  }

 public getUsuarios():void {
     this.homeService.getUsuarios().subscribe({
      next: (Response: Usuarios) => {
        this.usuario = Response;
      },
      error:(error:HttpErrorResponse) => {
      alert(error.message);
      }
      
     })
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

  public onOpenModal(mode: string, usuarios?: Usuarios): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addUsuariosModal');
    } else if (mode === 'delete') {
      this.deleteUsuarios = usuarios;
      button.setAttribute('data-bs-target', '#deleteUsuariosModal');
    } else if (mode === 'edit') {
      this.editUsuarios = usuarios;
      button.setAttribute('data-bs-target', '#editUsuariosModal');
    }

    container?.appendChild(button);
    button.click();
  }

public onAddUsuarios(addForm: NgForm): void {
  document.getElementById('add-usuarios-form')?.click();
  this.homeService.addUsuarios(addForm.value).subscribe({
    next: (response: Usuarios) => {
      console.log(response);
      this.getUsuarios();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateUsuarios(usuario: Usuarios){
  this.editUsuarios = usuario;
  document.getElementById('add-usuarios-form')?.click();
  this.homeService.updateUsuarios(usuario).subscribe({
    next: (response:Usuarios) =>{
      console.log(response);
      this.getUsuarios();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

public onDeleteUsuarios(idUsu:number):void{
this.homeService.deleteUsuarios(idUsu).subscribe({
    next: (response:void) =>{
      console.log(response);
      this.getUsuarios();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

}
