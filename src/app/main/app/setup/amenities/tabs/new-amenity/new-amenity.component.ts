import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AmenityService } from './../../amenity.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-amenity',
  templateUrl: './new-amenity.component.html',
  styleUrls: ['./new-amenity.component.scss']
})
export class NewAmenityComponent implements OnInit {
    amenityForm: FormGroup;
    editstate: Boolean = false;
    amenityId: any;

    @Output() componentEvent = new EventEmitter<any>();

  constructor(
      private _formbuilder: FormBuilder,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      private _amenityService: AmenityService
  ) { }

  ngOnInit(): void{
      this.amenityForm = this._formbuilder.group({
          description: ['', Validators.required]
      });
  }

    save(): void {
        if (this.editstate === false) {
            this.create();
        }
        else {
            this.edit();
            this.editstate = false;
        }
    }

    create(): void {
        const data = this.amenityForm.value;
        // console.log(data);

        this._amenityService.createAmenity(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.amenityForm.reset();
                }
                else {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }

            },
            error => {
                this.snackBar.open(error, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        );
    }

    edit(): void {
        const data = this.amenityForm.value;
        // console.log(data);
        data.Id = this.amenityId;
        this._amenityService.editAmenity(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.amenityForm.reset();
                }
                else {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                }

            },
            error => {
                this.snackBar.open(error, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        );
    }

    setForm(info): void {
        this.editstate = true;
        this.amenityForm.reset();
        const branch = info;

        this.amenityId = branch.id;

        this.amenityForm = this._formbuilder.group({
            description: [branch.description, Validators.required],
        });
        // console.log(branch);
    }

}
