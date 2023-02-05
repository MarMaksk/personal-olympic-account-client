import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPermissionsModule} from "ngx-permissions";
import {AppRoutingModule} from "./app-routing.module";
import {OlympicAccountModule} from "./account/olympic-account.module";
import {MaterialModule} from "./material.module";
import {RouterModule} from "@angular/router";
import {UserModule} from "./user/user.module";
import {NavigationComponent} from "./navigation/navigation.component";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    AppRoutingModule,
    OlympicAccountModule,
    MaterialModule,
    RouterModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
