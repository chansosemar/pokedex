import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import {HStack, Spacer, VStack} from '@components';
import {useRecoilValue} from 'recoil';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {useFetchData, capitalizeFirstLetter} from '@hooks';
import {Atoms} from '@store';
import {Colors, CustomSpacing} from '@styles';

import {GET_SPECIES_URL} from './Detail.Api';

import styles from './Detail.style';
import axios, {AxiosResponse} from 'axios';

type PropsType = {
  route: {
    key: string;
    name: string;
    path: string | undefined;
    params: {
      url: string;
    };
  };
};

type ChainProps = {
  name: string;
};

const ChainEvolveComponent = (props: ChainProps) => {
  const chainEvolveState = useRecoilValue(Atoms.chainEvolveState);
  const {fetchDataFromApi} = useFetchData(Atoms.chainEvolveState);
  const [chainEvolutionUrl, setChainEvolutionUrl] = useState<string>('');
  const [speciesNamesArray, setSpeciesNamesArray] = useState([]);

  useEffect(() => {
    setSpeciesNamesArray([]);
    const fetchSpecies = async () => {
      if (props?.name) {
        try {
          const response: AxiosResponse<any> = await axios.get(
            GET_SPECIES_URL.replace('{name}', props.name),
          );
          const data: any = await response.data;
          setChainEvolutionUrl(data.evolution_chain.url);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchSpecies();
  }, [props?.name]);

  useEffect(() => {
    if (chainEvolutionUrl) {
      setSpeciesNamesArray([]);
      fetchDataFromApi(chainEvolutionUrl);
    }
  }, [chainEvolutionUrl]);

  const getEvolutionChain = (
    pokemon: any,
    speciesArray: Array<string>,
    setSpeciesArray: any,
  ) => {
    if (pokemon) {
      const speciesName = pokemon.species.name;
      setSpeciesArray((prevArray: Array<string>) => [
        ...prevArray,
        speciesName,
      ]);

      if (pokemon.evolves_to.length > 0) {
        getEvolutionChain(
          pokemon.evolves_to[0],
          speciesArray,
          setSpeciesNamesArray,
        );
      }
    }
  };

  useEffect(() => {
    if (chainEvolveState) {
      getEvolutionChain(
        chainEvolveState?.chain,
        speciesNamesArray,
        setSpeciesNamesArray,
      );
    }
  }, [chainEvolveState]);

  return (
    <VStack>
      <Text style={styles.detailTitle}>Evolution Chain</Text>
      <HStack style={styles.wrapContainer}>
        {speciesNamesArray?.map((e: any, i: number) => {
          return (
            <VStack
              key={`${i}-chain`}
              style={[
                styles.moveContainer,
                {
                  backgroundColor:
                    e === props.name ? Colors.YELLOW700 : Colors.RED700,
                },
              ]}>
              <Text style={styles.moveTitle}>{capitalizeFirstLetter(e)}</Text>
            </VStack>
          );
        })}
      </HStack>
    </VStack>
  );
};

const Detail: React.FC<PropsType> = ({route}) => {
  const navigation = useNavigation();
  const {url} = route.params;
  const detailPokemonState = useRecoilValue(Atoms.detailPokemonState);
  const {fetchDataFromApi} = useFetchData(Atoms.detailPokemonState);

  useEffect(() => {
    if (url) {
      fetchDataFromApi(url);
    }
  }, []);

  const renderImages = (imageUri: string) => {
    return <FastImage style={styles.renderImage} source={{uri: imageUri}} />;
  };

  const moveData = detailPokemonState?.moves?.slice(0, 10);

  return (
    <VStack padding={CustomSpacing(20)} style={styles.detailContainer}>
      <ScrollView>
        <Spacer height={CustomSpacing(20)} />
        <VStack>
          <Pressable
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}>
            <Text>Go Back</Text>
          </Pressable>
        </VStack>
        <Spacer height={CustomSpacing(20)} />
        <VStack style={styles.imageContainer}>
          <HStack>
            {renderImages(detailPokemonState?.sprites?.front_default)}
            {renderImages(detailPokemonState?.sprites?.back_default)}
          </HStack>
          <HStack>
            {renderImages(detailPokemonState?.sprites?.front_shiny)}
            {renderImages(detailPokemonState?.sprites?.back_shiny)}
          </HStack>
        </VStack>

        <VStack>
          <HStack style={styles.titleContainer}>
            <Text style={styles.title}>
              {capitalizeFirstLetter(detailPokemonState?.name)}
            </Text>
            <VStack>
              <HStack>
                {detailPokemonState?.types?.map((e: any, i: number) => {
                  return (
                    <VStack style={styles.typesContainer} key={`${i}-types`}>
                      <Text style={styles.typesTitle}>
                        {capitalizeFirstLetter(e.type.name)}
                      </Text>
                    </VStack>
                  );
                })}
              </HStack>
            </VStack>
          </HStack>

          <VStack>
            <Text style={styles.detailTitle}>
              Height : {detailPokemonState?.height}
            </Text>
            <Text style={styles.detailTitle}>
              Weight : {detailPokemonState?.weight}
            </Text>
          </VStack>
          <VStack>
            <Text style={styles.detailTitle}>Move</Text>
            <HStack style={styles.wrapContainer}>
              {moveData?.map((e: any, i: number) => {
                return (
                  <VStack key={`${i}-moveData`} style={styles.moveContainer}>
                    <Text style={styles.moveTitle}>{e.move.name}</Text>
                  </VStack>
                );
              })}
            </HStack>
          </VStack>
          <ChainEvolveComponent name={detailPokemonState?.name} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Detail;
