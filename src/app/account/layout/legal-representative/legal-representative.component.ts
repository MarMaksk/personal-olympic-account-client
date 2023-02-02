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
        this.personForm = this.createPersonForm()
        this.passportForm = this.createPassportForm()
        this.isDataLoaded = true;
      }, error => {
        this.personForm = this.createPersonForm()
        this.passportForm = this.createPassportForm()
        this.isDataLoaded = true;
        this.notification.showSnackBar("Произошла ошибка при обращении к серверу")
      })
  }

  createPersonForm(): FormGroup {
    if (this.person == null)
      return this.fb.group({
          secondName: ['', Validators.compose([Validators.required])],
          firstName: ['', Validators.compose([Validators.required])],
          lastName: ['', Validators.compose([Validators.required])],
          number: ['', Validators.compose([Validators.required,
            Validators.pattern('^(\\+375|80)(29|25|44|33)(\\d{3})(\\d{2})(\\d{2})$')])],
        }
      )
    else
      return this.fb.group({
          secondName: [this.person.secondName, Validators.compose([Validators.required])],
          firstName: [this.person.firstName, Validators.compose([Validators.required])],
          lastName: [this.person.lastName, Validators.compose([Validators.required])],
          number: [this.person.number, Validators.compose([Validators.required,
            Validators.pattern('^(\\+375|80)(29|25|44|33)(\\d{3})(\\d{2})(\\d{2})$')])],
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
    if (!this.participantExist) {
      let passport: Passport
      passport = {
        series: this.passportForm.value.series,
        number: this.passportForm.value.number,
        identityNumber: this.passportForm.value.identityNumber
      }
      this.person = {
        firstName: this.personForm.value.firstName,
        secondName: this.personForm.value.secondName,
        lastName: this.personForm.value.lastName,
        passport: passport,
        number: this.personForm.value.number
      }
      this.participantService.addLegalRepresentative(this.person)
        .subscribe(() => {
            this.router.navigate(['/specializations']);
          },
          error => {
            console.log(error)
            this.notification.showSnackBar("Произошла ошибка при сохранении данных")
          })
    }
  }
}
