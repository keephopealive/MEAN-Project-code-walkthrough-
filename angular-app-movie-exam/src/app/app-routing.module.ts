import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { MovieNewComponent } from './movie-new/movie-new.component';
import { RatingNewComponent } from './rating-new/rating-new.component';

const routes: Routes = [
  { path: "", pathMatch:"full", redirectTo: "movies"},
  { path: "movies", component: MovieListComponent },
  { path: "movies/new", component: MovieNewComponent },
  { path: "movies/:id", component: RatingListComponent },
  { path: "movies/:id/rating", component: RatingNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
