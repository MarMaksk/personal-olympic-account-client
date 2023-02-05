import {Component, OnInit,} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NotificationService} from "../../../user/service/notification.service";
import {SpecializationService} from '../../service/specialization.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import {Specialization} from "../../models/specialization";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddSpecializationComponent} from "./add-specialization/add-specialization.component";

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

  constructor(private notification: NotificationService,
              private specializationService: SpecializationService,
              private dialog: MatDialog,
  ) {
  }

  displayedColumns: string[] = ['code', 'name', 'subject', 'countOfPlaces', 'delete'];
  dataToDisplay: Specialization[] | any;
  dataSource: any


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
    console.log(element)
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
