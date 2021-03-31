import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { loginModel } from '../model/loginModel';
import { UserModel } from '../model/UserModel';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  model!: loginModel;
   dat:any;
   
   message:any;

  constructor(private http:HttpClient,private router: Router,private cookie:CookieService)
  {}
   currentval="";
     cook:any;
   Handle(res :any)
   {
   
      

      var u = <resonpnse>res;
      this.message=u.msg;
      if (u.data === null)
  {
       console.log(u.msg);
       this.cookie.set('id',"");
  } 
  else if(u.role== "1")
  {
    this.cook=u.data.id;
    console.log(u.msg);
    this.router.navigateByUrl('/home', { state: u });
    this.cookie.set('id',u.data.id);

  }
  else if(u.role =="2")
  {
      this.router.navigateByUrl('/dashboard', { state: u });
      this.cookie.set('id',u.data.id);
  }
   
    
   }


   onClickMe(val:string , val2:string) {
  
  

    
    this.model = { username:val , password : val2};
 
    
    this.http.post('https://localhost:44339/api/User/login',this.model).subscribe(
      res=>
      {
        this.Handle(res);
    // console.log(this.model.username);
        
    });
  
     
  }



  

}


export interface data{
  userName:string,
  password:string
}

export interface resonpnse
  {
    data: UserModel,
    msg: string
    role:string
   
  }
