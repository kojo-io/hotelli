import { MatSnackBar } from '@angular/material';
import { BaseService } from './../../../utilities/base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    branch: any;
  constructor(
      private baseService: BaseService,
      public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void{
     // this.branch = this.baseService.getCurrentBranch().name;
  }

}
