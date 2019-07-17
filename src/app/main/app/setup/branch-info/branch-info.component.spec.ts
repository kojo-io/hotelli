
import { BranchInfoComponent } from './branch-info.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('BranchInfoComponent', () => {
  let component: BranchInfoComponent;
  let fixture: ComponentFixture<BranchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
