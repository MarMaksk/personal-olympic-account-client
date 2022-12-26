import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {ParticipantService} from "../../service/participant.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Passport} from "../../models/passport";
import {PersonDTO} from "../../models/personDTO";

@Component({
  templateUrl: './legal-representative.component.html',
  styleUrls: ['./legal-representative.component.css'],
  animations: [trigger('detailExpand', [state('collapsed', style({
    height: '0px',
    minHeight: '0'
  })),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),]),],
})
export class LegalRepresentativeComponent implements OnInit {

  isDataLoaded = false;

  person: PersonDTO | any
  passport: Passport | any

  public personForm: FormGroup | any;
  public passportForm: FormGroup | any;
  public policy = false;
  public dataProcessing = false;

  constructor(private notification: NotificationService,
              private participantService: ParticipantService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.personForm = this.createPersonForm()
    this.passportForm = this.createPassportForm()
  }

  formsValid(): boolean {
    return !!(this.personForm.invalid || this.passportForm.invalid || !this.policy || !this.dataProcessing);
  }

  createPersonForm(): FormGroup {
    return this.fb.group({
        secondName: ['', Validators.compose([Validators.required])],
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        number: ['', Validators.compose([Validators.required,
          Validators.pattern('^(\\+375|80)(29|25|44|33)(\\d{3})(\\d{2})(\\d{2})$')])],
      }
    )
  }

  createPassportForm(): FormGroup {
    return this.fb.group({
        series: ['', Validators.compose([Validators.required,
          Validators.pattern('[A-Z]{2}')])],
        number: ['', Validators.compose([Validators.required,
          Validators.pattern('[0-9]{7}')])],
        identityNumber: ['', Validators.compose([Validators.required,
          Validators.pattern('[A-Z0-9]{14}')])]
      }
    )
  }

  submit(): void {
    this.passport = {
      series: this.passportForm.value.series,
      number: this.passportForm.value.number,
      identityNumber: this.passportForm.value.identityNumber
    }
    this.person = {
        firstName: this.personForm.value.firstName,
        secondName: this.personForm.value.secondName,
        lastName: this.personForm.value.lastName,
        passport: this.passport,
        number: this.personForm.value.number
    }
    console.log(this.person)
    this.participantService.addLegalRepresentative(this.person)
      .subscribe(() => {
        },
        error => this.notification.showSnackBar("Произошла ошибка при сохранении данных"))
  }
}
