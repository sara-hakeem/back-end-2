import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dropbox, users } from 'dropbox';
import { CookieService } from 'ngx-cookie-service';
import { UserFileModel } from '../model/UserFile';
import { UserModel } from '../model/UserModel';

declare var gapi: any;
declare var google: any;

@Component({
  selector: 'app-homefor-user',
  templateUrl: './homefor-user.component.html',
  styleUrls: ['./homefor-user.component.scss']
})
export class HomeforUserComponent implements OnInit {
  user!:resonpnse;
  message:any;

  selectedFile:any;

  onFileSelected(event:any)
  {
      this.selectedFile =<File>event.target.files[0];

 const fd = new FormData();

 fd.append('file', this.selectedFile,this.selectedFile.name);
 this.http.post('https://localhost:44339/api/UserFile/UploadFiles?id='+this.cookie.get('id')+'+&filename='+this.selectedFile.name,fd).
 subscribe(res => {
  this.load();
 });
  }
 // developerKey = 'VwVkU0YJzsToO15DB7CYexy3';
 // clientId = "310345551469-ejkm9mjg11q1u29dfsri1j9rk2epk7b6.apps.googleusercontent.com"
 developerKey = 'VwVkU0YJzsToO15DB7CYexy3';
  clientId = "310345551469-ejkm9mjg11q1u29dfsri1j9rk2epk7b6"
  scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive'//insert scope here
  ].join(' ');
  pickerApiLoaded = false;
  oauthToken?: any;

  loadGoogleDrive() {
    gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
    gapi.load('picker', { 'callback': this.onPickerApiLoad.bind(this) });
  }

  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        'client_id': this.clientId,
        'scope': this.scope,
        'immediate': false
      },
      this.handleAuthResult);
  }

  onPickerApiLoad() {
    this.pickerApiLoaded = true;
  }
    
 
 
  
  handleAuthResult(authResult:any) {

    let src;
    if (authResult && !authResult.error) {
      if (authResult.access_token) {
        console.log(authResult.accessToken)
        let view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("image/png,image/jpeg,image/jpg,video/mp4");
        let pickerBuilder = new google.picker.PickerBuilder();
        let picker = pickerBuilder.
          enableFeature(google.picker.Feature.NAV_HIDDEN).
          setOAuthToken(authResult.access_token).
          addView(view).
          addView(new google.picker.DocsUploadView()).
          setCallback((e:any) => {
            console.log(e)
            if (e[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
              let doc = e[google.picker.Response.DOCUMENTS][0];
              src = doc[google.picker.Document.URL];
              console.log("Document selected is", doc,"and URL is ",src);
              HomeforUserComponent.obj.uploadfile(src,doc);
            }
          }).
          build();
        picker.setVisible(true);
      }
    }
    
  }
    uploadfile(url :string , doc :any)
  {

 this.http.get('https://localhost:44339/api/UserFile/UploadFilesByLink?filepath='+url+'&id='+this.cookie.get('id')+'+&filename='+doc.name).
 subscribe(res => {
  this.load();
 });

  }



  
  userfile! : UserFileModel [] ;

   static obj:HomeforUserComponent ;

  constructor(private router:Router,private http:HttpClient,private cookie:CookieService) 
  {
    this.user = <resonpnse>this.router.getCurrentNavigation()?.extras.state
    HomeforUserComponent.obj=this;
    console.log(this.user)
  }
 



  onClickMe(u:UserFileModel) 
  {

      this.http.get('https://localhost:44339/api/UserFile/SendFile?uid='+this.cookie.get('id')+ '&fid='+u.id).subscribe(res=>
{
  var ad  =<resonpnse>res;
  this.message=ad.msg;
  if(ad.sucess)
  {
  // this.router.navigateByUrl('/home');
  }
  else
  {
    this.router.navigateByUrl('/');
  }
  u.status="Send";
  console.log(res);
});
    
     // this.router.navigateByUrl('/');
    
  }
  ngOnInit(): void {
   
       this.load();   
  }

 load() :void {
  {

    if(this.cookie.get('id') == "")
    {
      this.router.navigateByUrl('/');
    }

    this.http.get('https://localhost:44339/api/UserFile/getFileByUserId?Id='+ this.cookie.get('id') ).subscribe(
    res=> 
    {
      var ad  =<resonpnse>res;
      this.message=ad.msg;
       if(ad.sucess)
       {
        this.userfile=ad.data;
       }
       else
       {
         this.router.navigateByUrl('/');
       }
     
   }
  )
  }

}

}

export interface resonpnse
  {
    data: UserFileModel[],
    msg: string
    sucess:boolean
   
  }