import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewinventoryComponent } from './newinventory.component';

describe('NewinventoryComponent', () => {
  let component: NewinventoryComponent;
  let fixture: ComponentFixture<NewinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
