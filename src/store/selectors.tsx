import {selector} from 'recoil';
import {listPokemonState, searchQueryState} from './atoms';

export const filteredPokemonListState = selector({
  key: 'filteredPokemonListState',
  get: ({get}) => {
    const pokemonList = get(listPokemonState);
    const searchQuery = get(searchQueryState);
    if (pokemonList) {
      if (searchQuery) {
        return pokemonList.results.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      } else {
        return pokemonList.results;
      }
    }
  },
});
