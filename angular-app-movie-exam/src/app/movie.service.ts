import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _httpClient: HttpClient) { }

  createMovieAndReview(formData) {
    return this._httpClient.post( "/api/movies", formData );
  }

  getAllMovies(){
    return this._httpClient.get( "/api/movies" );
  }

  getAllRatingsByMovieId(id){
    return this._httpClient.get( "/api/movies/"+id );
  }
  
  createRating(movieId, formData){
    return this._httpClient.post("/api/ratings/"+movieId, formData);
  }

}
