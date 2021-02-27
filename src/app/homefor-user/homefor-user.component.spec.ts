import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeforUserComponent } from './homefor-user.component';
import{Dropbox}from'dropbox';


describe('HomeforUserComponent', () => {
  let component: HomeforUserComponent;
  let fixture: ComponentFixture<HomeforUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeforUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeforUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
