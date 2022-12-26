import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {RegistrationComponent} from "./auth/registration/registration.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {LoginComponent} from "./auth/login/login.component";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import {MaterialModule} from "../material.module";
import {RouterModule} from "@angular/router";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders,
    authErrorInterceptorProviders],
  exports: [UserComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    EditUserComponent
  ]
})
export class UserModule {
}
