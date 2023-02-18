import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {ParticipantService} from "../../service/participant.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../models/address";
import {Participant} from "../../models/participant";
import {Passport} from "../../models/passport";
import {Router} from "@angular/router";

@Component({
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
  animations: [trigger('detailExpand', [state('collapsed', style({
    height: '0px',
    minHeight: '0'
  })),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),]),],
})
export class PersonalDataComponent implements OnInit {

  isDataLoaded = false;
  participantExist = false;
  registered = false;

  participant: Participant | any

  public participantForm: FormGroup | any;
  public addressForm: FormGroup | any;
  public passportForm: FormGroup | any;
  public policy = false;
  public dataProcessing = false;
  public minDateVal = new Date(Date.now());
  public maxDateVal = new Date(Date.now());

  constructor(private notification: NotificationService,
              private participantService: ParticipantService,
              private fb: FormBuilder,
              private router: Router,
              private tokenService: TokenStorageService) {
    this.maxDateVal.setFullYear(this.maxDateVal.getFullYear() - 15)
    this.minDateVal.setFullYear(this.minDateVal.getFullYear() - 18)
  }

  ngOnInit(): void {
    this.loadParticipant()
  }

  loadParticipant(): void {
    this.participantService.find(this.tokenService.getId())
      .subscribe(data => {
        this.participant = data
        if (this.participant.id != null) {
          console.log(this.participant)
          this.participantExist = true
          this.policy = true
          this.dataProcessing = true
        }
        if (this.participant.registered)
          this.registered = true
        console.log(this.registered)
        console.log(this.participant.registered)
        this.addressForm = this.createAddressForm()
        this.participantForm = this.createParticipantForm()
        this.passportForm = this.createPassportForm()
        this.isDataLoaded = true;
      }, error => {
        this.addressForm = this.createAddressForm()
        this.participantForm = this.createParticipantForm()
        this.passportForm = this.createPassportForm()
        this.isDataLoaded = true;
        this.notification.showSnackBar("Произошла ошибка при обращении к серверу")
      })
  }

  formsValid(): boolean {
    return !!(this.addressForm.invalid || this.participantForm.invalid || this.passportForm.invalid || !this.policy
      || !this.dataProcessing);

  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  createParticipantForm(): FormGroup {
    if (this.participant.person != null)
      return this.fb.group({
          secondName: [this.participant.person.secondName, Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          firstName: [this.participant.person.firstName, Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          lastName: [this.participant.person.lastName, Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          birthday: [this.participant.birthday, Validators.compose([Validators.required])],
          number: [this.participant.person.number, Validators.compose([Validators.required,
            Validators.pattern('^(\\+375|80)(29|25|44|33)(\\d{3})(\\d{2})(\\d{2})$')])],
          email: [this.participant.email, Validators.compose([Validators.email])],
        }
      )
    else
      return this.fb.group({
          secondName: ['', Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          firstName: ['', Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          lastName: ['', Validators.compose([Validators.pattern('^[А-яё]+$')])],
          birthday: ['', Validators.compose([Validators.required])],
          number: ['', Validators.compose([Validators.required,
            Validators.pattern('^(\\+375|80)(29|25|44|33|21)(\\d{3})(\\d{2})(\\d{2})$')])],
          email: ['', Validators.compose([Validators.email])],
        }
      )
  }

  createAddressForm(): FormGroup {
    if (this.participant.address != null)
      return this.fb.group({
          area: [this.participant.address.area, Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          district: [this.participant.address.district, Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          locality: [this.participant.address.locality, Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          street: [this.participant.address.street, Validators.compose([Validators.required])],
          house: [this.participant.address.house, Validators.compose([Validators.required])],
          corps: [this.participant.address.corps == 0 ? null : this.participant.address.corps],
          flat: [this.participant.address.flat == 0 ? null : this.participant.address.flat],
          educationalInstitution: [this.participant.educationalInstitution, Validators.compose([Validators.required])]
        }
      )
    else
      return this.fb.group({
          area: ['', Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          district: ['', Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          locality: ['', Validators.compose([Validators.required,
            Validators.pattern('^[А-яё]+$')])],
          street: ['', Validators.compose([Validators.required])],
          house: ['', Validators.compose([Validators.required])],
          corps: [''],
          flat: [''],
          educationalInstitution: ['', Validators.compose([Validators.required])]
        }
      )
  }

  createPassportForm(): FormGroup {
    if (this.participant.person != null)
      return this.fb.group({
          series: [this.participant.person.passport.series, Validators.compose([Validators.required,
            Validators.pattern('[A-Z]{2}')])],
          number: [this.participant.person.passport.number, Validators.compose([Validators.required,
            Validators.pattern('[0-9]{7}')])],
          identityNumber: [this.participant.person.passport.identityNumber, Validators.compose([Validators.required,
            Validators.pattern('[A-Z0-9]{14}')])]
        }
      )
    else
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
    if (!this.registered) {
      let address: Address
      let passport: Passport
      address = {
        id: this.participantExist ? this.participant.address.id : null,
        area: this.addressForm.value.area,
        district: this.addressForm.value.district,
        locality: this.addressForm.value.locality,
        street: this.addressForm.value.street,
        house: this.addressForm.value.house,
        corps: this.addressForm.value.corps,
        flat: this.addressForm.value.flat
      }
      passport = {
        id: this.participantExist ? this.participant.person.passport.id : null,
        series: this.passportForm.value.series,
        number: this.passportForm.value.number,
        identityNumber: this.passportForm.value.identityNumber
      }
      this.participant = {
        id: this.tokenService.getId(),
        person: {
          id: this.participantExist ? this.participant.person.id : null,
          firstName: this.participantForm.value.firstName,
          secondName: this.participantForm.value.secondName,
          lastName: this.participantForm.value.lastName,
          passport: passport,
          number: this.participantForm.value.number
        },
        registered: this.registered,
        birthday: this.participantForm.value.birthday,
        address: address,
        email: this.participantForm.value.email,
        educationalInstitution: this.addressForm.value.educationalInstitution,
      }
      if (this.participantExist)
        this.participantService.update(this.participant)
          .subscribe(data => {
              this.router.navigate(['/legal-representative']);
            },
            error => {
              this.notification.showSnackBar(error)
            })
      else
        this.participantService.create(this.participant)
          .subscribe(data => {
              this.router.navigate(['/legal-representative']);
            },
            error => {
              this.notification.showSnackBar(error)
            })
    }
  }

  disableDate() {
    return false;
  }
}
