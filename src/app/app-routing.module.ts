import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { state: 'home' }},
  { path: 'home', component: HomeComponent, data: {state: 'home'} },
  { path: 'privacy', component: PrivacyComponent, data: { state: 'privacy' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
