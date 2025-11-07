import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { EditProfileComponent } from './components/edit-profile/edit-profile';
import { ResetPasswordComponent } from './components/reset-password/reset-password';
import { NgModule } from '@angular/core';
import { EducationComponent } from './components/education/education';
import { InternshipComponent } from './components/internship/internship';
import { ProjectComponent } from './components/project/project';
import { CertificationComponent } from './components/certification/certification';
import { OthersComponent } from './components/others/others';
import { SharedDashboardComponent } from './shared/shared-dashboard/shared-dashboard';
import { SharedNavbar } from './shared/shared-navbar/shared-navbar';
import { SharedEducation } from './shared/shared-education/shared-education';
import { SharedInternship } from './shared/shared-internship/shared-internship';
import { SharedProject } from './shared/shared-project/shared-project';
import { SharedCertification } from './shared/shared-certification/shared-certification';
import { SharedOthers } from './shared/shared-others/shared-others';
import { SharedProfile } from './shared/shared-profile/shared-profile';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path: 'education', component: EducationComponent},
  {path: 'internship', component: InternshipComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'certification', component: CertificationComponent},
  {path: 'others', component: OthersComponent},
  { path: 'profileview/:id', component: SharedDashboardComponent },
  { path: 'profileviews', component: SharedProfile },
  {path: 'sharednavbar' , component : SharedNavbar},
  {path: 'sharededucation', component : SharedEducation},
  {path: 'sharedinternship', component : SharedInternship},
  {path: 'sharedproject', component : SharedProject},
  {path: 'sharedcertificate', component : SharedCertification},
  {path: 'sharedothers', component : SharedOthers}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
