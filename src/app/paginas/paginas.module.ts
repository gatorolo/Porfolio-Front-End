import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasroutingModule } from './paginasrouting.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { LoginComponent } from './login/login.component';
import { ProjectsComponent} from './projects/projects.component';
import { StudiesComponent } from './studies/studies.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [
    LoginComponent,
    ProjectsComponent,
    StudiesComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    SocialComponent
  ],
  imports: [
    CommonModule,
    PaginasroutingModule,
    FormsModule,
    FontAwesomeModule,
    NgCircleProgressModule.forRoot({})
  ]
})
export class PaginasModule { }
