import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalServerComponent } from './Errors/internal-server/internal-server.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { TestsErrorComponent } from './Errors/tests-error/tests-error.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { CanpreventGuard } from './_guards/canprevent.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListsComponent },
      { path: "members/:username", component: MemberDetailsComponent },
      { path: "member/edit", component: MemberEditComponent, canDeactivate:[CanpreventGuard] },
      { path: "lists", component: ListsComponent },
      { path: "messages", component: MessagesComponent }
      
    ]
  },
  { path: "errors", component: TestsErrorComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "server-error", component: InternalServerComponent },
  { path: "**", component: HomeComponent, pathMatch: "full" },
  
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
