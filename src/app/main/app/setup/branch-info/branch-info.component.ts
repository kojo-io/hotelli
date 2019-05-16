import { Component, OnInit, ViewChild } from '@angular/core';
import { ListbranchComponent } from './tabs/listbranch/listbranch.component';
import { NewBranchComponent } from './tabs/new-branch/new-branch.component';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-branch-info',
  templateUrl: './branch-info.component.html',
  styleUrls: ['./branch-info.component.scss']
})
export class BranchInfoComponent implements OnInit {

    selectedIndex: Number = 0;
    @ViewChild(NewBranchComponent) newbranch;
    @ViewChild(ListbranchComponent) Allbranch;

  constructor() { }

  ngOnInit(): void {
  }

    receiveSelectedindex($event): void {
        this.selectedIndex = $event.selectedIndex;
        if ($event.formdata){
            this.newbranch.setForm($event.formdata);
        }
    }

    tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
        this.selectedIndex = tabChangeEvent.index;
        this.Allbranch.getAllBranches();
    }
}
