import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeforAdminComponent } from './homefor-admin.component';

describe('HomeforAdminComponent', () => {
  let component: HomeforAdminComponent;
  let fixture: ComponentFixture<HomeforAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeforAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeforAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
