import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: 'chat', component: LobbyComponent },
  { path: 'chat/:lobby', component: LobbyComponent },
  { path: 'chat/:lobby/:name', component: LobbyComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
