import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rating-new',
  templateUrl: './rating-new.component.html',
  styleUrls: ['./rating-new.component.css']
})
export class RatingNewComponent implements OnInit {
  movieId: any;

  constructor(
    private _movieService: MovieService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe( (params) => {
      console.log(params['id'])
      this.movieId = params['id'];
    })
  }

  createRating(formData) {
    console.log("RatingNewComponent > formData > ", formData);
    this._movieService.createRating(this.movieId, formData.value).subscribe(
      (response) => {
        console.log("RESPONSE FROM SERVER: ", response);
      }, 
      (err) => {
        console.log(err);
      }
    )
  }

}
