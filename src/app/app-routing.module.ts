import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes:Routes=[
  {
    path:'', 
    component:AdminLayoutComponent, 
    children:[
      {
        path:'',
        loadChildren:'./admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
