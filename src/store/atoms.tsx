import {atom} from 'recoil';

type ListPokemonStateType = {
  name: string;
  url: string;
};

type PokemonApiType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListPokemonStateType[];
};

const listPokemonState = atom<PokemonApiType>({
  key: 'listPokemonState',
  default: {},
});

const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});

const detailPokemonState = atom<any>({
  key: 'detailPokemonState',
  default: {},
});

const chainEvolveState = atom<any>({
  key: 'chainEvolveState',
  default: {},
});

export {
  listPokemonState,
  searchQueryState,
  detailPokemonState,
  chainEvolveState,
};
