import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieNewComponent } from './movie-new/movie-new.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { RatingNewComponent } from './rating-new/rating-new.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieNewComponent,
    MovieListComponent,
    RatingNewComponent,
    RatingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
