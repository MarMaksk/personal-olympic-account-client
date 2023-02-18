import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../user/service/notification.service";
import {SpecializationService} from "../../../service/specialization.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-examination',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.css']
})
export class AddSpecializationComponent implements OnInit {

  public addForm: FormGroup | any
  public isDataLoaded: boolean = true

  constructor(private fb: FormBuilder,
              private notification: NotificationService,
              private dialogRef: MatDialogRef<AddSpecializationComponent>,
              private specializationService: SpecializationService
  ) {
  }

  ngOnInit(): void {
    this.addForm = this.createAddForm()
  }

  createAddForm(): FormGroup {
    return this.fb.group({
        code: ['', Validators.compose([Validators.required,
        Validators.pattern('(\\d{1})(-)(\\d{2})(-)(\\d{4})(-)(\\d{2})')])],
        name: ['', Validators.compose([Validators.required])],
        subject: ['', Validators.compose([Validators.required])],
        countOfPlaces: ['', Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    this.specializationService.create({
      code: this.addForm.value.code,
      name: this.addForm.value.name,
      subject: this.addForm.value.subject,
      countOfPlaces: this.addForm.value.countOfPlaces
    })
      .subscribe(() => {
        this.notification.showSnackBar("Добавлено")
        this.closeDialog()
      }, error => this.notification.showSnackBar("Произошла ошибка"))
  }


  closeDialog() {
    this.dialogRef.close()
  }

}
