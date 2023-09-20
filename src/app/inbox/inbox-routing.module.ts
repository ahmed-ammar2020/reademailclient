import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxHomeComponent } from './inbox-home/inbox-home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { emailResolver } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: InboxHomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: '',
        component: PlaceholderComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: {
          email: emailResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
