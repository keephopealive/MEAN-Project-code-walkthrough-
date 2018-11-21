import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  ratings: any;

  constructor(
    private _movieService: MovieService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
        console.log(params['id'])
        this._movieService.getAllRatingsByMovieId( params['id'] ).subscribe(
          (response) => {
            console.log("RESPONDED , ", response);
            if(response['status']){
              this.ratings = response['ratings'];
            }
          },
          (err) => {
            console.log(err);
          }
        )
    });
  }

}
