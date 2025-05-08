  // home.component.ts
  import { Component, OnInit } from '@angular/core';
  import { PokeAPIService } from '../../services/poke-api.service';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CommonModule]  
  })
  export class HomeComponent implements OnInit {
    pokemonAtual: any;
    pokemonAnterior: any;
    pokemonProximo: any;
  
    private apiUrlImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    private apiUrlIcon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/';
    private apiUrlGif = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/';
  
    constructor(private pokeApiService: PokeAPIService) {}
  
    ngOnInit(): void {
      this.carregarPokemon(2); // Começa pelo ID 1
    }
  
    carregarPokemon(id: number): void {
      this.pokeApiService.getPokemonById(id).subscribe(pokemon => {
        this.pokemonAtual = pokemon;
  
        // Carregar anterior
        if (id > 1) {
          this.pokeApiService.getPokemonById(id - 1).subscribe(pokeAnt => {
            this.pokemonAnterior = pokeAnt;
          });
        } else {
          this.pokemonAnterior = null;
        }
  
        // Carregar próximo
        if (id < 151) {
          this.pokeApiService.getPokemonById(id + 1).subscribe(pokeProx => {
            this.pokemonProximo = pokeProx;
          });
        } else {
          this.pokemonProximo = null;
        }
      });
    }
  
    getPokemonImageUrl(id: number): string {
      return `${this.apiUrlImage}/${id}.png`;
    }
  
    getPokemonImageGif(id: number): string {
      return `${this.apiUrlGif}/${id}.gif`;
    }
  
    getPokemonImageIcon(id: number): string {
      return `${this.apiUrlIcon}/${id}.png`;
    }

    busca: string = ''; // ngModel do input

buscarPokemon(): void {
  const termo = this.busca.trim().toLowerCase();
  if (!termo) return;

  this.pokeApiService.getPokemonByIdOrName(termo).subscribe(pokemon => {
    this.carregarPokemon(pokemon.id);
  }, err => {
    console.error('Pokémon não encontrado.');
    this.pokemonAtual = this.pokemonAnterior = this.pokemonProximo = null;
  });
}

setPokemonAtual(pokemon: any): void {
  this.carregarPokemon(pokemon.id);
}


  }

  
  