import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * This function navigates to the movies page
   * @function goToMovies
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * This function navigates to the profile page
   * @function goToProfile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * This function logs the user out by clearing local storage and navigates to the welcome page
   * @function logOut
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
