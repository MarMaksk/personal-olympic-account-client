import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./user/auth/registration/registration.component";
import {ProfileComponent} from "./user/user/profile/profile.component";
import {LoginComponent} from "./user/auth/login/login.component";
import {AuthGuardService} from "./user/helper/auth-guard.service";
import {PersonalDataComponent} from "./account/layout/personal-data/personal-data.component";
import {LegalRepresentativeComponent} from "./account/layout/legal-representative/legal-representative.component";
import {SpecializationsComponent} from "./account/layout/specializations/specializations.component";
import {SuccessRegistrationComponent} from "./account/layout/success-registration/success-registration.component";
import {AdminPanelComponent} from "./account/layout/admin-panel/admin-panel.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'main', component: PersonalDataComponent, canActivate: [AuthGuardService]},
  {path: 'legal-representative', component: LegalRepresentativeComponent, canActivate: [AuthGuardService]},
  {path: 'specializations', component: SpecializationsComponent, canActivate: [AuthGuardService]},
  {path: 'success-registration', component: SuccessRegistrationComponent, canActivate: [AuthGuardService]},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuardService]},
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
