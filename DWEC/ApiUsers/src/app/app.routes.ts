import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "users"},
    { path: "users", component: UserListComponent},
    { path: "nuevo/user", component: UserFormComponent },
    { path: "user/:_id", component: UserViewComponent},
    { path: "actualizar/user/:_id", component: UserFormComponent},
    {path: "**", redirectTo: "users"}
];
