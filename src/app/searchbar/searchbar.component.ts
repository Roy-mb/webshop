import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent { 

  searchTerm: String="";

  constructor(private route: ActivatedRoute, private router:Router){

  }
  ngOnInit(): void{
    this.route.params.subscribe(params => {
      if(params.searchTerm)
      this.searchTerm = params.searchTerm;
    })
  }

  search(): void{
    if(this.searchTerm)
    this.router.navigateByUrl('/search/' + this.searchTerm);
  }
}
