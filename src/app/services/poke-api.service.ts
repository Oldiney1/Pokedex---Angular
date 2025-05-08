import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private http: HttpClient) {}

  getPokemonByIdOrName(idOrName: string | number): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  }
  

  getPokemonById(id: number): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
  
}
