import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginAuthComponent } from './login-auth/login-auth.component';
//import { QuizComponent } from './quiz/quiz.component';
//import { UserDetailsComponent } from './user-details/user-details.component';
//import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: 'login', component: LoginAuthComponent },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule),canActivate: [AuthGuardService]
  },
  

  { path: '**', redirectTo: 'login' },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
