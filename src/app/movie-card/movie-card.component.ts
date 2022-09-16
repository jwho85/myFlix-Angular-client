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
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  viewGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '280px'
    });
  }

  viewDirector(name: string, bio: string, birthday: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
        Death: death,
      },
      width: '280px'
    });
  }

  viewSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '280px'
    });
  }

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

  isFavoriteMovie(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }
}

