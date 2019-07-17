import { BaseService } from 'app/utilities/base.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { receptionNav } from 'app/navigation/receptionnav';
import { Component, OnInit } from '@angular/core';
import { navigation } from 'app/navigation/navigation';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

    navigation: any;

  constructor(
      private _fuseNavigationService: FuseNavigationService,
      private _fuseSidebarService: FuseSidebarService,
      private _baseService: BaseService
  ) {
      //  Get default navigation
      if (this._baseService.getUserData().role === 'Administrator') {
          this.navigation = navigation;
      }

      if (this._baseService.getUserData().role === 'Receptionist') {
          this.navigation = receptionNav;
      }
      // Set default navigation

      // Unregister navigation
      this._fuseNavigationService.unregister('setups');

      // Register the navigation to the service
      this._fuseNavigationService.register('setups', this.navigation);

      // Set the main navigation as our current navigation
      this._fuseNavigationService.setCurrentNavigation('setups');
  }

  ngOnInit(): void {
  }

}
