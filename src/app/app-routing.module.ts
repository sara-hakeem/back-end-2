import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeforAdminComponent } from './homefor-admin/homefor-admin.component';
import { HomeforUserComponent } from './homefor-user/homefor-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = 
[
  { 
path:'',
component:LoginComponent
},
{ 
  path:'register',
  component:RegisterComponent
  },
  { 
    path:'dashboard',
    component:HomeforAdminComponent
    },
    { 
      path:'home',
      component:HomeforUserComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{

}
