import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { StudiesComponent } from './studies/studies.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { SocialComponent } from './social/social.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'skills', component: SkillsComponent},
      {path: 'studies', component: StudiesComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'change-password', component: LoginComponent},
      {path: 'social', component: SocialComponent},
      
      {path: '**', redirectTo: 'home'}

      
      
    ]
  }
]


@NgModule({

  imports: [
  RouterModule.forChild(routes)
  ]
})
export class PaginasroutingModule { }
