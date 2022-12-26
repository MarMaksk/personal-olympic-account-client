import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./user/auth/registration/registration.component";
import {ProfileComponent} from "./user/user/profile/profile.component";
import {LoginComponent} from "./user/auth/login/login.component";
import {AuthGuardService} from "./user/helper/auth-guard.service";
import {PersonalDataComponent} from "./account/layout/personal-data/personal-data.component";
import {LegalRepresentativeComponent} from "./account/layout/legal-representative/legal-representative.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'main', component: PersonalDataComponent},
  {path: 'legal-representative', component: LegalRepresentativeComponent},
  // {path: 'specialization', component: LegalRepresentativeComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
