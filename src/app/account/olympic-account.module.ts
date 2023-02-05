import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OlympicAccountComponent} from "./olympic-account.component";
import {MaterialModule} from "../material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {PersonalDataComponent} from "./layout/personal-data/personal-data.component";
import {LegalRepresentativeComponent} from './layout/legal-representative/legal-representative.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SpecializationsComponent} from './layout/specializations/specializations.component';
import {SuccessRegistrationComponent} from './layout/success-registration/success-registration.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {AdminPanelComponent} from "./layout/admin-panel/admin-panel.component";
import {AddSpecializationComponent} from "./layout/admin-panel/add-specialization/add-specialization.component";


@NgModule({
  declarations: [OlympicAccountComponent,
    PersonalDataComponent,
    LegalRepresentativeComponent,
    SpecializationsComponent,
    SuccessRegistrationComponent,
    AdminPanelComponent,
    AddSpecializationComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [OlympicAccountComponent]
})
export class OlympicAccountModule {
}
