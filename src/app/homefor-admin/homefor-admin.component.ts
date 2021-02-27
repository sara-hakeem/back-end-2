import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserModel } from '../model/UserModel';
import { UserFileModel } from '../model/UserFile';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homefor-admin',
  templateUrl: './homefor-admin.component.html',
  styleUrls: ['./homefor-admin.component.scss']
})
export class HomeforAdminComponent implements OnInit {

  constructor(private  http:HttpClient) { }

  userfile! : UserFileModel [] ;

  ngOnInit(): void {
    this.http.get('https://localhost:44339/api/UserFile/GetFileToAdmin').subscribe(
      res=>
      {
      this.userfile =<UserFileModel[]>res;
    }
    );
  }

}
