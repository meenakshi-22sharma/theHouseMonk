import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() recipeUrl = ''; 
  constructor(
    private searchService: SearchService
  ) { }

  recipeDetail;

  ngOnInit(): void {
    this.searchService.getRecipeDetail(this.recipeUrl).subscribe(
      (response:any)=>{
        this.recipeDetail = response.recipe;
      }
    )
  }

}
