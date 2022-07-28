import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  app_id = environment.app_id;
  app_key = environment.app_key;

  constructor(
    private httpService: HttpClient
  ) { }

  getHeader() {
    return this.getUnauthenticatedHeader()
  }

  getUnauthenticatedHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getSearchResults(search_query, fields, diet, health, cal_min, cal_max, ingr){
    let field = ''
    fields.forEach(element => {
      field += `&field=${element}`;
    });
    let diets = '';
    diet.forEach(element=>{
      diets += `&diet=${element}`;
    })
    let healths = ''
    health.forEach(element=>{
      healths += `&health=${element}`;
    })
    let cals = ''
    if(cal_max && cal_min){
      cals = `&calories=${cal_min}-${cal_max}`;
    }else if(cal_max){
      cals = `&calories=${cal_max}`;
    }
    else if(cal_min){
      cals = `&calories=${cal_min}+`;
    }

    let ing = '';
    if(ingr){
      ing = `&ingr=${ingr}`
    }


    console.log(field)
    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search_query}&app_id=${this.app_id}&app_key=${this.app_key}${field}${diet}${healths}${cals}${ing}`;
    return this.httpService.get(url, {headers: this.getHeader()});
  }
}
