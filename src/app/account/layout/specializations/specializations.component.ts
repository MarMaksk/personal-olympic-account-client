import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../user/service/notification.service";
import {ParticipantService} from "../../service/participant.service";
import {Specialization} from "../../models/specialization";
import {SpecializationService} from "../../service/specialization.service";

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.css']
})
export class SpecializationsComponent implements OnInit {

  isDataLoaded = false;

  specializationsForParticipant: Specialization[] | any
  loadedSpecialization: Specialization[] | any

  public specializationForm: FormGroup | any;
  public policy = false;
  public dataProcessing = false;

  constructor(private notification: NotificationService,
              private participantService: ParticipantService,
              private specializationService: SpecializationService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.specializationForm = this.createSpecializationForm()
    this.findAllSpecializations()
  }

  formsValid(): boolean {
    return (this.policy || this.dataProcessing);
  }

  createSpecializationForm(): FormGroup {
    return this.fb.group({
        id: ['', Validators.compose([Validators.required])],
        code: ['', Validators.compose([Validators.required])],
        name: ['', Validators.compose([Validators.required])],
        subject: ['', Validators.compose([Validators.required])],
        countOfPlaces: ['', Validators.compose([Validators.required])]
      }
    )
  }

  private findAllSpecializations(): void {
    this.specializationService.findAll()
      .subscribe(data => {
        this.loadedSpecialization = data;
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении специальностей произошла ошибка"))
  }


  submit(): void {
    // this.participantService.create(this.participant)
    //   .subscribe(() => {
    //     },
    //     error => this.notification.showSnackBar("Произошла ошибка при сохранении данных"))
  }
}
