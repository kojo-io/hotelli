import { BranchInfoService } from '../../../main/app/setup/branch-info/branch-info.service';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { BaseService } from 'app/utilities/base.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
    selector   : 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    user: any;
    currentBranch: any;
    AllBranches: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private _baseService: BaseService,
        private _router: Router,
        private _branchService: BranchInfoService
    )
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'tr',
                title: 'Turkish',
                flag : 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});

        this.user = this._baseService.getEmployeeData();
       this.getCurrentBranch();
       this.getAllBranches();
    }

    getCurrentBranch(): void{
        const branch = this._baseService.getCurrentBranch();
        if (branch != null){
            this._branchService.getbranch(branch.id).subscribe(
                result => {
                    if (result.branch === null)
                    {
                        this._baseService.clearBranchInfo();
                        this._branchService.listBranches().subscribe(
                            results => {
                                if (results.branches != null) {

                                    results.branches.forEach(element => {
                                        if (element.name === 'Main') {
                                            this.setCurrentBranch(element.id);
                                        }
                                    });
                                }
                               
                            }
                        );
                    }
                    else {
                        this.currentBranch = branch.name;
                    }
                }
            );
        }
        else{
            this._branchService.listBranches().subscribe(
                results => {
                    if (results.branches != null){

                        results.branches.forEach(element => {
                            if (element.name === 'Main'){
                                this.setCurrentBranch(element.id);
                            }
                        });
                    }
                }
            );
        }
    }

    getAllBranches(): void {
        if (this._branchService.listBranches())
        {
            this._branchService.listBranches().subscribe(
                result => {
                    if (result.branches != null) {
                        this.AllBranches = result.branches;
                    }
                }
            );
        }
    }
    setCurrentBranch(data): void{
        this._branchService.getbranch(data).subscribe(
            results => {
                // console.log(results);
                this._baseService.setCurrentBranch({ id: results.branch.id, name: results.branch.name});
                this.currentBranch = results.branch.name;
                this._router.navigate(['/app/dashboard']);
            }
        );
        
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logout(): void{
        this._baseService.clearSessionData();
        this._router.navigate(['/login']);
    }
}
