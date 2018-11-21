import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit {

  constructor(
    private _movieService: MovieService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  createMovie(formData) {
    console.log("MovieNewComponent > createMovie(formData) > ", formData);
    this._movieService.createMovieAndReview(formData.value).subscribe(
      (result) => { 
        console.log("MovieNewComponent > createMovie(formData) > CALLBACK FROM SERVER: ", result);
        if(result['status']){
          console.log("MovieNewComponent > createMovie(formData) > CALLBACK FROM SERVER -- status: TRUE: ", result['status']);
          this._router.navigate(['/movies']);
        }
      }, 
      (err) => {

      }
    )
  }

}
