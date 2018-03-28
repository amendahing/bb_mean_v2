import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { ReviewsComponent } from './reviews/reviews.component';



const routes: Routes = [
    { path: '',component: AllComponent },
    { path: 'add_pet',component: NewComponent },
    { path: 'edit_pet/:id',component: EditComponent },
    { path: 'pet_detail/:id',component: ReviewsComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
