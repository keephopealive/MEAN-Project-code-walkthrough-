import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any;

  constructor(private _movieService: MovieService) { }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies(){
    this._movieService.getAllMovies().subscribe(
      (response) => {
        if(response['status']){
          console.log("Server succeeded in retrieving all movies...");
          this.movies = response['movies']
        } else {
          console.log("Server failed to retrieve all movies...");
        }
      },
      (err) => {

      },

    )
  }

}
