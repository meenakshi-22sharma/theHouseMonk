import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  @Output() filterEvent = new EventEmitter();

  diet = this._formBuilder.group({
    "vegetarian": false,
    "low-fat": false,
    "vegan": false,
    "low-sodium": false,
    "paleo": false,
    "low-sugar": false,
    "high-fiber": false,
    "alcohol-free": false,
    "high-protein": false,
    "balanced": false,
    "low-carb": false,
    "immuno-supportive": false
  });

  selected_health = [];
  selected_diet = [];
  api_diet = [
    "balanced",
    "high-fiber",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium"
  ]

  api_health = [
    "alcohol-cocktail",
    "alcohol-free",
    "celery-free",
    "crustacean-free",
    "dairy-free",
    "egg-free",
    "DASH",
    "fish-free",
    "fodmap-free",
    "gluten-free",
    "immuno-supportive",
    "keto-friendly",
    "kidney-friendly",
    "kosher",
    "low-potassium",
    "low-sugar",
    "lupine-free",
    "Mediterranean",
    "mollusk-free",
    "mustard-free",
    "No-oil-added",
    "paleo",
    "peanut-free",
    "pecatarian",
    "pork-free",
    "sesame-free",
    "shellfish-free",
    "soy-free",
    "sugar-conscious",
    "sulfite-free",
    "tree-nut-free",
    "vegan",
    "vegetarian",
    "wheat-free"
  ]

  allergies = this._formBuilder.group({
    "gluten-free": false,
    "fish-free": false,
    "dairy-free": false,
    "shellfish-free": false,
    "egg-free": false,
    "tree-nut-free": false,
    "soy-free": false,
    "peanut-free": false,
    "wheat-free": false
  })

  calories = this._formBuilder.group({
    minimum: null,
    maximum: null
  })

  ingredients = this._formBuilder.group({
    n_ingredients: null
  })

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  searchResults(){
    this.iter_dict(this.allergies.value);
    this.iter_dict(this.diet.value);
    var filter_data = { 
      "diet": this.selected_diet,
      "health": this.selected_health,
      "ing_up_to": this.ingredients.get("n_ingredients").value,
      "cal_min": this.calories.get("minimum").value,
      "cal_max": this.calories.get("maximum").value
    }
    this.filterEvent.emit(filter_data);
  }

  iter_dict(arr){
    for (const [key, value] of Object.entries(arr)) {
      if(value == true){
        this.populate_con(key)
      }
    }
  }

  populate_con(key){
    this.api_diet.forEach(element=>{
      if(key==element){
        this.selected_diet.push(key)
      }
    })
    this.api_health.forEach(element=>{
      if(key==element){
        this.selected_health.push(key)
      }
    })
  }

}
