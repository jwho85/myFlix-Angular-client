import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = []; //put all movies into an array
  favoriteMovies: any[] = []; //put favorite movies into an array

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * This function gets all moves and puts them into the movies array
   * @function getMovies
   * @returns the movies array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * This function gets the user's favorite movies and puts them into the favoriteMovies array
   * @function getFavoriteMovies
   * @returns the favoriteMovies array
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * This function opens the genre dialog box
   * @function viewGenre
   * @param name 
   * @param description 
   */
  viewGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '280px'
    });
  }

  /**
   * This function opens the director dialog box
   * @function viewDirector
   * @param name 
   * @param bio 
   * @param birth 
   * @param death 
   */
  viewDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death,
      },
      width: '280px'
    });
  }

  /**
   * This function opens the synopsis dialog box
   * @function viewSynopsis
   * @param title 
   * @param description 
   */
  viewSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '280px'
    });
  }

  /**
   * This function adds a favorite movie to the user's list of favorite movies
   * @function addFavoriteMovie
   * @param id 
   * @param title 
   */
  addFavoriteMovie(id: string, title: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
      console.log(title);
      this.snackBar.open('"' + title + '"' + ' has been added to your favorites.', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * This function deletes a favorite movie from the user's list of favorite movies
   * @function deleteFavoriteMovie
   * @param id 
   * @param title 
   */
  deleteFavoriteMovie(id: string, title: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
      console.log(title);
      this.snackBar.open('"' + title + '"' + ' has been removed from your favorites.', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * This function checks to see whether a favorite movie is already selected
   * @function isFavoriteMovie
   * @param id 
   * @returns 
   */
  isFavoriteMovie(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }
}

