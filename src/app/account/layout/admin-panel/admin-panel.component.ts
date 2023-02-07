import {Component, OnInit,} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NotificationService} from "../../../user/service/notification.service";
import {SpecializationService} from '../../service/specialization.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {Specialization} from "../../models/specialization";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddSpecializationComponent} from "./add-specialization/add-specialization.component";
import {AdminService} from "../../service/admin.service";
import {UpdateSpecializationComponent} from "./update-specialization/update-specialization.component";
import {saveAs} from "file-saver";

@Component({
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  animations: [trigger('detailExpand', [state('collapsed', style({
    height: '0px',
    minHeight: '0'
  })),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),]),],
})
export class AdminPanelComponent implements OnInit {
  public isDataLoaded: boolean = false
  public participantsDrop: boolean = false

  constructor(private notification: NotificationService,
              private specializationService: SpecializationService,
              private adminService: AdminService,
              private dialog: MatDialog,
  ) {
  }

  displayedColumns: string[] = ['code', 'name', 'subject', 'countOfPlaces', 'update', 'delete'];
  dataToDisplay: Specialization[] | any;
  dataSource: any

  deleteAllParticipants(): void {
    this.adminService.deleteAllParticipants()
      .subscribe(data => {
        this.notification.showSnackBar("Все участники успешно удалены")
      }, error => this.notification.showSnackBar(error))
  }

  infoAboutUsers() {
    this.adminService.infoAboutUsers()
      .subscribe(data => {
        const blob = new Blob([data], {type: 'application/vnd.ms.excel'});
        const file = new File([blob], "Список участников олимпиад" + '.xlsx',
          {type: 'application/vnd.ms.excel'});
        saveAs(file);
      }, error => {
        console.log(error)
      })
  }

  updateFlight(spec: Specialization) {
    const dialogFlightEditConfig = new MatDialogConfig();
    dialogFlightEditConfig.width = '50%'
    dialogFlightEditConfig.data = {
      specialization: spec
    }
    this.dialog.open(UpdateSpecializationComponent, dialogFlightEditConfig)
  }

  addSpecialization() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%'
    this.dialog.open(AddSpecializationComponent, dialogConfig)
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }

  ngOnInit(): void {
    this.findAllSpecializations()
  }

  private findAllSpecializations(): void {
    this.specializationService.findAll()
      .subscribe(data => {
        this.dataToDisplay = data;
        this.dataSource = new ExampleDataSource(this.dataToDisplay);
        this.isDataLoaded = true;
      }, error => this.notification.showSnackBar("При получении специальностей произошла ошибка"))
  }

  refresh(): void {
    this.findAllSpecializations()
  }

  delete(element: Specialization) {
    this.specializationService.delete(element.id)
      .subscribe(data => {
      }, error => this.notification.showSnackBar("Внутренняя ошибка сервера" + error))
  }
}

class ExampleDataSource extends DataSource<Specialization> {
  private _dataStream = new ReplaySubject<Specialization[]>();

  constructor(initialData: Specialization[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Specialization[]> {
    return this._dataStream;
  }

  disconnect() {
  }

  setData(data: Specialization[]) {
    this._dataStream.next(data);
  }
}
