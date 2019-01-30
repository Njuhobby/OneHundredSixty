import{Routes} from '@angular/router';
import{DashboardComponent} from '../dashboard/dashboard.component';
import{TableComponent} from '../table/table.component';
import{UserProfileComponent} from '../user-profile/user-profile.component'

export const AdminLayoutRoutes:Routes = [
    {path:'dashboard', component:DashboardComponent},
    {path:'user-profile', component:UserProfileComponent}, 
    {path:'table', component:TableComponent}
];