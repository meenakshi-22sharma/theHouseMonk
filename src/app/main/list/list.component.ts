import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../../service/search.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchQueryForm: FormGroup;
  searchResult;
  searching = false;
  fields = ["label", "image", "source", "ingredients", "calories"];
  diet = [];
  health = [];
  ingredient = null;
  cal_min = 0;
  cal_max = 0;
  query = '';
  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
  ) { }

  searchResults(): void {
    this.call_api();
  }


  // ():void{
  //   this.call_api();
  // }

  ngOnInit(): void {
    this.searchQueryForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  searcKeyResults = this.debounce(() => this.call_api());

  addFilter(event) {
    this.diet = event.diet;
    this.health = event.health;
    this.cal_max = event.cal_max;
    this.cal_min = event.cal_min;
    this.ingredient = event.ing_up_to;
    this.call_api();
  }

  count = 0;
  call_api() {
    this.searching = true;
    this.query = this.searchQueryForm.get('query').value;
    if (this.query.length > 2) {
      this.searchService.getSearchResults(this.query, this.fields, this.diet, this.health, this.cal_min, this.cal_max, this.ingredient).subscribe(
        (response: any) => {
          this.searchResult = response.hits;
          this.count = response.count;
          this.searching = false;
        },
        (error) => {
          console.log(error)
          this.searching = false;
        }
      )
    }
    else {
      this.searching = false;
      alert("Please enter more than 2 characters");
    }
  }

}
