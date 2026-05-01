import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/servicios/about.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  public abouts: About[] = [];
  public about = this.aboutService.getAbout();
  public editAbout: About | undefined;

  islogged = false;
  isloggingFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  faPen = faPen;

  constructor(
    private aboutService: AboutService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAbout();

    if (this.tokenService.getToken()) {
      this.islogged = true;
      this.isloggingFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  public getAbout(): void {
    this.aboutService.getAbout().subscribe({
      next: (Response: About[]) => {
        this.abouts = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      (data) => {
        this.islogged = true;
        this.isloggingFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['']);
      },
      (error) => {
        this.islogged = false;
        this.isloggingFail = true;
        this.errMsj = error.error.mensaje;
      }
    );
  }

  public onOpenModal(mode: string, about?: About): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.editAbout = about;
      button.setAttribute('data-bs-target', '#editAboutModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddAbout(addForm: NgForm): void {
    document.getElementById('add-about-form')?.click();
    this.aboutService.addAbout(addForm.value).subscribe({
      next: (response: About) => {
        console.log(response);
        this.getAbout();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateAbout(about: About) {
    this.editAbout = about;
    document.getElementById('add-about-form')?.click();
    this.aboutService.updateAbout(about).subscribe({
      next: (Response: About) => {
        console.log(Response);
        this.getAbout();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteAbout(idAb: number): void {
    this.aboutService.deleteAbout(idAb).subscribe({
      next: (response: void) => {
        console.log(Response);
        this.getAbout();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
