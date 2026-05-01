import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  islogged = false;
  isloggingFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  emailRecovery!: string; // Added for ngModel
  roles: string[] = [];
  errMsj!: string;
  registroExitoso: boolean = false;
  isRecoveringPassword: boolean = false;
  isChangingPassword: boolean = false;
  nuevaPassword!: string;
  repetirPassword!: string;

  constructor(
    private tokenService: TokenService, 
    private authService: AuthService, 
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('change-password')) {
      this.isChangingPassword = true;
    }

    if(this.tokenService.getToken()) {
      this.islogged = true;
      this.isloggingFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onRegister(): void {
    this.registroExitoso = true;
    console.log("Registro iniciado...");
  }

  onForgotPassword(): void {
    this.isRecoveringPassword = true;
  }

  onSendRecoveryEmail(): void {
    console.log("Email de recuperación enviado!");
    // Simulamos que el usuario hace click en el link del mail navegando a:
    this.router.navigate(['/paginas/change-password']);
  }

  onChangePassword(): void {
    if (this.nuevaPassword && this.nuevaPassword === this.repetirPassword) {
      const resetDto = {
        nombreUsuario: 'user', 
        password: this.nuevaPassword
      };

      this.authService.resetPassword(resetDto).subscribe(
        data => {
          alert("Contraseña actualizada con éxito en la BD!");
          this.isChangingPassword = false;
          this.router.navigate(['/paginas/login']);
        },
        err => {
          alert("Error al actualizar la contraseña: " + err.error.mensaje);
        }
      );
    } else if (this.nuevaPassword !== this.repetirPassword) {
      alert("Las contraseñas no coinciden!");
    } else {
      alert("Por favor complete los campos.");
    }
  }

  onLogin(): void {
    // Bypass para ingreso local/desarrollo
    if (this.nombreUsuario === 'rodrigodaremberg@gmail.com' && this.password === 'Research21@') {
      console.log("Acceso concedido mediante bypass local (Credenciales hardcodeadas)");
      this.islogged = true;
      this.isloggingFail = false;
      this.tokenService.setToken('bypass-token-dev');
      this.tokenService.setUserName('Rodrigo');
      this.tokenService.setAuthorities([{ authority: 'ROLE_ADMIN' }, { authority: 'ROLE_USER' }]);
      this.roles = ['ROLE_ADMIN', 'ROLE_USER'];
      this.router.navigate(['/paginas/home']);
      return;
    }

    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
     this.authService
      .login(this.loginUsuario).subscribe(data => {
        this.islogged = true;
        this.isloggingFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/paginas/home'])
      }, err =>{
        this.islogged = false;
        this.isloggingFail = true;
        this.errMsj = err.error.mensaje;
      })
  }
}
