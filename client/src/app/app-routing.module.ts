import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./_guards/auth.guard";
import { Role } from "./_models/role";

const routes: Routes = [
  {
    path: "",
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User] }
  },
  {
    path: "login",
    component: LoginComponent
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
