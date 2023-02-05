import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {NotificationService} from "../../../user/service/notification.service";
import {ParticipantService} from "../../service/participant.service";
import {Specialization} from "../../models/specialization";
import {SpecializationService} from "../../service/specialization.service";
import {TokenStorageService} from "../../../user/service/token-storage.service";
import {SDOuserService} from "../../service/sdo-user.service";

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.css']
})
export class SpecializationsComponent implements OnInit {

  isDataLoaded = false;

  specializationsForParticipant: Specialization[] = []
  loadedSpecialization: Specialization[] | any
  selectedValue: Specialization | any;

  public specializationForm: FormGroup | any;
  public policy = false;
  public dataProcessing = false;
  private participantExist = false;

  constructor(private notification: NotificationService,
              private participantService: ParticipantService,
              private specializationService: SpecializationService,
              private tokenService: TokenStorageService,
              private sdoUserService: SDOuserService) {
  }

  ngOnInit(): void {
    this.findAllSpecializations()
    this.loadSpecialization()
  }

  loadSpecialization(): void {
    this.participantService.find(this.tokenService.getId())
      .subscribe(data => {
        this.specializationsForParticipant = Array.from(new Set(data.specializations));
        if (this.specializationsForParticipant.length != 0) {
          this.participantExist = true
          this.policy = true
          this.dataProcessing = true
        }
        console.log(this.participantExist + " exist spec")
        this.isDataLoaded = true;
      }, error => {
        this.isDataLoaded = true;
        this.notification.showSnackBar("Произошла ошибка при обращении к серверу")
      })
  }

  addSpecialization() {
    if (this.participantExist != true) {
      this.specializationsForParticipant.push(this.selectedValue)
      this.specializationsForParticipant = Array.from(new Set(this.specializationsForParticipant));
    }
  }


  formsValid(): boolean {
    return (!this.policy || !this.dataProcessing || this.specializationsForParticipant.length > 2);
  }

  submit(): void {
    if (!this.participantExist) {
      this.sdoUserService.create()
        .subscribe(data => {
        })
      this.participantService.addSpecializations(this.specializationsForParticipant)
        .subscribe(data => {
          },
          error => this.notification.showSnackBar("Произошла ошибка при сохранении данных"))
    }
  }

  remove(spec: Specialization) {
    if (this.participantExist != true)
      this.specializationsForParticipant = this.specializationsForParticipant.filter(item => item !== spec);
  }

  private findAllSpecializations(): void {
    this.specializationService.findAll()
      .subscribe(data => {
        this.loadedSpecialization = data;
        this.selectedValue = this.loadedSpecialization[0]
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении специальностей произошла ошибка"))
  }
}
