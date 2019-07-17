import { RoomService } from '../../room.service';
import { RoomtypeService } from '../../../roomtype/roomtype.service';
import { RoompriceService } from '../../../roomprice/roomprice.service';
import { BaseService } from 'app/utilities/base.service';
import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent implements OnInit {
    roomForm: FormGroup;
    editstate: Boolean = false;
    roomId: any;
    roomType: any;
    roomPrice: any;
    roomStatus: any;
    preValue: any;
    @Output() componentEvent = new EventEmitter<any>();
  constructor(
      private _formbuilder: FormBuilder,
      private _roomService: RoomService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      private _roomTypeService: RoomtypeService,
      private _roomPriceService: RoompriceService,
      private _baseService: BaseService
  ) { }

  ngOnInit(): void {
      this.roomForm = this._formbuilder.group({
          number: ['', Validators.required],
          roomTypeId: ['', Validators.required],
        //   roomPriceId: ['', Validators.required],
          roomStatus: ['', Validators.required],
          adult: [Validators.required],
          children: [Validators.required],
          floor: [Validators.required],
          description: [''],
          isActive: [true]
      });

      this.preValue = this.roomForm.value;
      this.getAllRoomTypes();
      this.getStates();
  }

    getAllRoomTypes(): void {
        this._roomTypeService.listRoomTypes().subscribe(
            result => {
                if (result != null) {
                    this.roomType = result;
                }
            }
        );
    }

    getStates(): void {
        this._baseService.getRoomStates().subscribe(
            result => {
                if (result != null) {
                    this.roomStatus = result;
                }
            }
        );
    }
    getAllRoomPrices(): void {
        this._roomPriceService.listRoomPrices().subscribe(
            result => {
                if (result != null) {
                    this.roomPrice = result;
                }
            }
        );
    }

    setForm(info): void {
        this.editstate = true;
        this.roomForm.reset();
        const room = info;

        this.roomId = room.id;

        this.roomForm = this._formbuilder.group({
            number: [room.number, Validators.required],
            roomTypeId: [room.roomTypeId, Validators.required],
            // roomPriceId: [room.roomPriceId, Validators.required],
            roomStatus: [room.roomStatus, Validators.required],
            adult: [room.adult, Validators.required],
            children: [room.children, Validators.required],
            floor: [room.floor, Validators.required],
            description: [room.description],
            isActive: [room.isActive]
        });
        // console.log(branch);
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
        const data = this.roomForm.value;
        // console.log(data);

        this._roomService.createRoom(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.clearform();
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
        const data = this.roomForm.value;
        // console.log(data);
        data.id = this.roomId;
        this._roomService.editRoom(data).subscribe(
            result => {
                if (result.status === 'Success') {
                    this.snackBar.open(result.message, 'dismiss', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    this.componentEvent.emit({ selectedIndex: 0 });
                    this.clearform();
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

    clearform(): void {
        this.roomForm.reset();
        this.roomForm.setValue(this.preValue);
    }

}
