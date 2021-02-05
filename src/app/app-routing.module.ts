import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { AddContactFormComponent } from "./add-contact-form/add-contact-form.component";


const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/:id', component: ContactDetailsComponent },
  { path: 'add', component: AddContactFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
