import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../user/service/notification.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {ParticipantService} from "../../service/participant.service";
import {AddressService} from "../../service/address.service";
import {PassportService} from "../../service/passport.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../models/address";
import {Participant} from "../../models/participant";
import {Passport} from "../../models/passport";

@Component({
  selector: 'app-airplans',
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

  displayedColumns: string[] | any
  page: number = 0;
  size: number = 4;
  totalCount: number = 0;
  isDataLoaded = false;
  address: Address | any
  participant: Participant | any
  passport: Passport | any

  public participantForm: FormGroup | any;
  public addressForm: FormGroup | any;
  public passportForm: FormGroup | any;

  constructor(private notification: NotificationService,
              private participantService: ParticipantService,
              private addressService: AddressService,
              private passportService: PassportService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private storage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.addressForm = this.createAddressForm()
    this.participantForm = this.createParticipantForm()
    this.passportForm = this.createPassportForm()
  }

  personData() {

  }

  createParticipantForm(): FormGroup {
    return this.fb.group({
        secondName: ['', Validators.compose([Validators.required])],
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        birthday: ['', Validators.compose([Validators.required])],
        number: ['', Validators.compose([Validators.required,
          Validators.pattern('^(\\+375|80)(29|25|44|33)(\\d{3})(\\d{2})(\\d{2})$')])],
        email: ['', Validators.compose([Validators.email])],
      }
    )
  }

  createAddressForm(): FormGroup {
    return this.fb.group({
        area: ['', Validators.compose([Validators.required])],
        district: ['', Validators.compose([Validators.required])],
        locality: ['', Validators.compose([Validators.required])],
        street: ['', Validators.compose([Validators.required])],
        house: ['', Validators.compose([Validators.required])],
        corps: ['', Validators.compose([Validators.required])],
        flat: ['', Validators.compose([Validators.required])],
        educationalInstitution: ['', Validators.compose([Validators.required])]
      }
    )
  }

  createPassportForm(): FormGroup {
    return this.fb.group({
        series: ['', Validators.compose([Validators.required,
          Validators.pattern('[0-9]{3}')])],
        number: ['', Validators.compose([Validators.required,
          Validators.pattern('[0-9]{7}')])],
        identityNumber: ['', Validators.compose([Validators.required,
          Validators.pattern('[A-Z0-9]{14}')])]
      }
    )
  }

  submit(): void {
    this.address = {
      area: this.addressForm.value.area,
      district: this.addressForm.value.district,
      locality: this.addressForm.value.locality,
      street: this.addressForm.value.street,
      house: this.addressForm.value.house,
      corps: this.addressForm.value.corps,
      flat: this.addressForm.value.flat
    }
    this.passport = {
      series: this.passportForm.value.series,
      number: this.passportForm.value.number,
      identityNumber: this.passportForm.value.identityNumber
    }
    this.participant = {
      person: {
        firstName: this.participantForm.value.firstName,
        secondName: this.participantForm.value.secondName,
        lastName: this.participantForm.value.lastName,
        passport: this.passport,
        number: this.participantForm.value.number
      },
      birthday: this.participantForm.value.birthday,
      address: this.address,
      email: this.participantForm.value.email,
      educationalInstitution: this.addressForm.value.educationalInstitution,
    }
    this.participantService.create(this.participant)
      .subscribe(() => {
        },
        error => this.notification.showSnackBar("Произошла ошибка при сохранении данных"))

  }
}
