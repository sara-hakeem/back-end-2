import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { loginModel } from '../model/loginModel';
import { UserModel } from '../model/UserModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  model!: loginModel;
   dat:any;

  constructor(private http:HttpClient,private router: Router){}
   currentval="";

   Handle(res :any)
   {
   
        
      var u = <resonpnse>res;

      if (u.data === null)
  {
       console.log(u.msg);
  }
  else{
      this.router.navigateByUrl('/home', { state: u });
  }
   
    
   }


   onClickMe(val:string , val2:string) {
  
    if(val=="admin"&&val2=="admin")
    {
      this.router.navigateByUrl('/dashboard');
    }
    else{

    
    this.model = { username:val , password : val2};
 
    
    this.http.post('https://localhost:44339/api/User/login',this.model).subscribe(
      res=>
      {
        this.Handle(res);
    // console.log(this.model.username);
        
    });
  }
     
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
  }
