import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserModel } from '../model/UserModel';
import { UserFileModel } from '../model/UserFile';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Console } from 'node:console';

@Component({
  selector: 'app-homefor-admin',
  templateUrl: './homefor-admin.component.html',
  styleUrls: ['./homefor-admin.component.scss']
})
export class HomeforAdminComponent implements OnInit {

  constructor(private  http:HttpClient,private router: Router,private cookie:CookieService) {

   }


  userfile! : UserFileModel [] ;
  

  user!: UserModel;
  ngOnInit(): void {
  if(this.cookie.get('id') == "")
  {
    this.router.navigateByUrl('/');
  }
    this.http.get('https://localhost:44339/api/UserFile/GetFileToAdmin?Id= '+this.cookie.get('id')).subscribe(
      res=>
      {
       var ad  =<Admin>res;
     
        if(ad.sucess)
        {
          this.userfile =ad.data;
        }
        else
        {
          this.router.navigateByUrl('/');
        }
      
    }
    );
  }

}

interface Admin{
  msg :string;
  sucess :boolean;
  data : UserFileModel [] ;
}
