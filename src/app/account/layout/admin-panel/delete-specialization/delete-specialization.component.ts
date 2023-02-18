import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NotificationService} from "../../../../user/service/notification.service";
import {SpecializationService} from "../../../service/specialization.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-examination',
  templateUrl: './delete-specialization.component.html',
  styleUrls: ['./delete-specialization.component.css']
})
export class DeleteSpecializationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private notification: NotificationService,
              private dialogRef: MatDialogRef<DeleteSpecializationComponent>,
              private specializationService: SpecializationService
  ) {
  }

  ngOnInit(): void {
  }


  submit(): void {
    this.specializationService.delete(this.data.specialization.id, true)
      .subscribe(data => {
        this.notification.showSnackBar("Специальность успешно удалена")
        this.closeDialog()
      }, error => {
        this.notification.showSnackBar("Внутренняя ошибка сервера" + error)
      })
  }


  closeDialog() {
    this.dialogRef.close()
  }

}
