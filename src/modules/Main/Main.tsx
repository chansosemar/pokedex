/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  Text,
  ListRenderItem,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import axios, {AxiosResponse} from 'axios';

import {Spacer, VStack} from '@components';
import {Colors, CustomSpacing} from '@styles';
import {capitalizeFirstLetter, useFetchData} from '@hooks';
import {Atoms, Selectors} from '@store';

import ApiClient from './Main.api';
import {dataType} from './Main.types';
import styles from './Main.style';

const Main = () => {
  const navigation = useNavigation();
  const [listPokemonState, setPokemonState] = useRecoilState(
    Atoms.listPokemonState,
  );
  const [searchQueryState, setSearchQueryState] = useRecoilState(
    Atoms.searchQueryState,
  );
  const filteredPokemonListState = useRecoilValue(
    Selectors.filteredPokemonListState,
  );
  const {fetchDataFromApi, loading} = useFetchData(Atoms.listPokemonState);

  useEffect(() => {
    fetchDataFromApi(ApiClient.INITIAL_LIST_POKEMON_URL);
  }, []);

  useEffect(() => {
    const searchByFetching = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get(
          ApiClient.SEARCH_POKEMON_URL.replace(
            '{name}',
            searchQueryState.toLowerCase(),
          ),
        );
        const data: any = await response.data;
        setPokemonState((prevData: any) => ({
          ...prevData,
          results: [
            ...new Map(
              [
                ...prevData.results,
                {
                  name: data.name,
                  url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
                },
              ].map(item => [item.name, item]),
            ).values(),
          ],
        }));
      } catch (error) {
        console.log(error);
      }
    };

    if (searchQueryState && filteredPokemonListState?.length === 0) {
      searchByFetching();
    }
  }, [searchQueryState]);

  const handleLoadMore = () => {
    fetchDataFromApi(listPokemonState.next, true);
  };

  const handlePokemonDetail = async (e: dataType) => {
    navigation.navigate('Detail', {
      url: e.url,
    });
  };

  const RenderItem: ListRenderItem<dataType> = useCallback(({item}) => {
    return (
      <Pressable
        style={styles.pokemonContainer}
        onPress={() => {
          handlePokemonDetail(item);
        }}>
        <Text style={styles.pokemonName}>
          {capitalizeFirstLetter(item.name)}
        </Text>
      </Pressable>
    );
  }, []);

  const FooterComponent = useCallback(() => {
    return (
      <VStack>
        {loading && <ActivityIndicator size={'large'} color={Colors.BLACK} />}
      </VStack>
    );
  }, [loading]);

  return (
    <VStack padding={CustomSpacing(20)}>
      <Spacer topSafeAreaHeight />
      <VStack>
        <Text style={styles.title}>Pokedex</Text>
        <Spacer height={CustomSpacing(16)} />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Search..."
          value={searchQueryState}
          onChangeText={e => setSearchQueryState(e)}
          clearButtonMode="always"
        />
      </VStack>
      <Spacer height={CustomSpacing(16)} />
      {filteredPokemonListState?.length === 0 && !loading && (
        <VStack>
          <Text>Pokemon you search not found! Try again with fullname.</Text>
        </VStack>
      )}
      <VStack>
        <FlatList
          keyExtractor={e => e.name}
          data={filteredPokemonListState}
          renderItem={RenderItem}
          numColumns={2}
          onEndReached={() => {
            if (!searchQueryState) {
              handleLoadMore();
            }
          }}
          onEndReachedThreshold={0.2}
          contentContainerStyle={{
            paddingBottom: CustomSpacing(100),
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={FooterComponent}
        />
      </VStack>
    </VStack>
  );
};

export default Main;
