import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../user/service/notification.service";
import {SpecializationService} from "../../../service/specialization.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-examination',
  templateUrl: './update-specialization.component.html',
  styleUrls: ['./update-specialization.component.css']
})
export class UpdateSpecializationComponent implements OnInit {

  public updateForm: FormGroup | any
  public isDataLoaded: boolean = true

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private notification: NotificationService,
              private dialogRef: MatDialogRef<UpdateSpecializationComponent>,
              private specializationService: SpecializationService
  ) {
  }

  ngOnInit(): void {
    this.updateForm = this.createUpdateForm()
  }

  createUpdateForm(): FormGroup {
    console.log(this.data)
    return this.fb.group({
        code: [this.data.specialization.code, Validators.compose([Validators.required,
          Validators.pattern('(\\d{1})(-)(\\d{2})(-)(\\d{4})(-)(\\d{2})')])],
        name: [this.data.specialization.name, Validators.compose([Validators.required])],
        subject: [this.data.specialization.subject, Validators.compose([Validators.required])],
        countOfPlaces: [this.data.specialization.countOfPlaces, Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    this.specializationService.create({
      id: this.data.specialization.id,
      code: this.updateForm.value.code,
      name: this.updateForm.value.name,
      subject: this.updateForm.value.subject,
      countOfPlaces: this.updateForm.value.countOfPlaces
    })
      .subscribe(() => {
        this.notification.showSnackBar("Обновлено")
        this.closeDialog()
      }, error => this.notification.showSnackBar("Произошла ошибка"))
  }


  closeDialog() {
    this.dialogRef.close()
  }

}
