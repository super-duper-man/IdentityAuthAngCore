import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './shared/auth.guard';
import { AdminOnlyComponent } from './authorizeDemo/admin-only/admin-only.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminOrTeacherComponent } from './authorizeDemo/admin-or-teacher/admin-or-teacher.component';
import { ApplyForMaternityLeaveComponent } from './authorizeDemo/apply-for-maternity-leave/apply-for-maternity-leave.component';
import { LibraryMemersOnlyComponent } from './authorizeDemo/library-memers-only/library-memers-only.component';
import { Under10AndFemaleComponent } from './authorizeDemo/under10-and-female/under10-and-female.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { claimReq } from './shared/utils/calimReq-utils';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: '/signin', pathMatch: 'full' },
      { path: 'signup', component: RegistrationComponent },
      { path: 'signin', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'admin-only',
        component: AdminOnlyComponent,
        data:{ claimReq: claimReq.adminOnly}
      },
      {
        path: 'admin-or-teacher',
        component: AdminOrTeacherComponent,
        data:{ claimReq: claimReq.adminOrTeacher}
      },
      {
        path: 'apply-for-maternity-leave',
        component: ApplyForMaternityLeaveComponent,
      },
      {
        path: 'library-members-only',
        component: LibraryMemersOnlyComponent,
      },
      {
        path: 'under-10-and-female',
        component: Under10AndFemaleComponent,
      },
      {
        path: 'forbidden',
        component: ForbiddenComponent,
      },
    ],
  },
];
