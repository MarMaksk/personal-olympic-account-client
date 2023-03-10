import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {ParticipantService} from "../../service/participant.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Passport} from "../../models/passport";
import {PersonDTO} from "../../models/personDTO";
import {Router} from "@angular/router";

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

  public personForm: FormGroup | any;
  public passportForm: FormGroup | any;
  public policy = false;
  public dataProcessing = false;
  public participantExist = false;
  registered = false;

  constructor(private notification: NotificationService,
              private participantService: ParticipantService,
              private fb: FormBuilder,
              private router: Router,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.loadRepresentative()
  }

  formsValid(): boolean {
    return !!(this.personForm.invalid || this.passportForm.invalid || !this.policy || !this.dataProcessing);
  }

  loadRepresentative(): void {
    this.participantService.find(this.tokenService.getId())
      .subscribe(data => {
        this.person = data.legalRepresentative
        if (this.person != null) {
          this.participantExist = true
          this.policy = true
          this.dataProcessing = true
        }
        if (data.registered)
          this.registered = true
        this.personForm = this.createPersonForm()
        this.passportForm = this.createPassportForm()
        this.isDataLoaded = true;
      }, error => {
        this.personForm = this.createPersonForm()
        this.passportForm = this.createPassportForm()
        this.isDataLoaded = true;
        this.notification.showSnackBar("?????????????????? ???????????? ?????? ?????????????????? ?? ??????????????")
      })
  }

  createPersonForm(): FormGroup {
    if (this.person == null)
      return this.fb.group({
        secondName: ['', Validators.compose([Validators.required,
          Validators.pattern('^[??-????]+$')])],
        firstName: ['', Validators.compose([Validators.required,
          Validators.pattern('^[??-????]+$')])],
        lastName: ['', Validators.compose([Validators.required,
          Validators.pattern('^[??-????]+$')])],
          number: ['', Validators.compose([Validators.required,
            Validators.pattern('^(\\+375|80)(29|25|44|33|21)(\\d{3})(\\d{2})(\\d{2})$')])],
        }
      )
    else
      return this.fb.group({
        secondName: [this.person.secondName, Validators.compose([Validators.required,
          Validators.pattern('^[??-????]+$')])],
        firstName: [this.person.firstName, Validators.compose([Validators.required,
          Validators.pattern('^[??-????]+$')])],
        lastName: [this.person.lastName, Validators.compose([Validators.required,
          Validators.pattern('^[??-????]+$')])],
          number: [this.person.number, Validators.compose([Validators.required,
            Validators.pattern('^(\\+375|80)(29|25|44|33|21)(\\d{3})(\\d{2})(\\d{2})$')])],
        }
      )
  }

  createPassportForm(): FormGroup {
    if (this.person == null)
      return this.fb.group({
          series: ['', Validators.compose([Validators.required,
            Validators.pattern('[A-Z]{2}')])],
          number: ['', Validators.compose([Validators.required,
            Validators.pattern('[0-9]{7}')])],
          identityNumber: ['', Validators.compose([Validators.required,
            Validators.pattern('[A-Z0-9]{14}')])]
        }
      )
    else
      return this.fb.group({
          series: [this.person.passport.series, Validators.compose([Validators.required,
            Validators.pattern('[A-Z]{2}')])],
          number: [this.person.passport.number, Validators.compose([Validators.required,
            Validators.pattern('[0-9]{7}')])],
          identityNumber: [this.person.passport.identityNumber, Validators.compose([Validators.required,
            Validators.pattern('[A-Z0-9]{14}')])]
        }
      )
  }

  submit(): void {
    if (!this.registered) {
      let passport: Passport
      passport = {
        id: this.participantExist ? this.person.passport.id : null,
        series: this.passportForm.value.series,
        number: this.passportForm.value.number,
        identityNumber: this.passportForm.value.identityNumber
      }
      this.person = {
        id: this.participantExist ? this.person.id : null,
        firstName: this.personForm.value.firstName,
        secondName: this.personForm.value.secondName,
        lastName: this.personForm.value.lastName,
        passport: passport,
        number: this.personForm.value.number
      }
      if (this.participantExist)
        this.participantService.updateLegalRepresentative(this.person)
          .subscribe(() => {
              this.router.navigate(['/specializations']);
            },
            error => {
              console.log(error)
              this.notification.showSnackBar("?????????????????? ???????????? ?????? ???????????????????? ????????????")
            })
      else
        this.participantService.addLegalRepresentative(this.person)
          .subscribe(() => {
              this.router.navigate(['/specializations']);
            },
            error => {
              console.log(error)
              this.notification.showSnackBar("?????????????????? ???????????? ?????? ???????????????????? ????????????")
            })
    }
  }
}
