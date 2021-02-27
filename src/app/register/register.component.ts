import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  user!: UserModel;

  currentval="";
  constructor(private http:HttpClient,private router: Router) { }
  onClickMe(val:string , val2:string, val3:string) {
  
    this.user = { id :"a" , name:val , password : val2,phone :val3 , role:0};
 
    
    this.http.post('https://localhost:44339/api/User/Register',this.user).subscribe(res=>{
      this.user =<UserModel>res;
      console.log(this.user.id);
      this.router.navigateByUrl('/home');
    });
     }

 
  ngOnInit(): void {
  }

}
