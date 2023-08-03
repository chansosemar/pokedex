import {StyleSheet} from 'react-native';
import {Colors, CustomSpacing} from '@styles';
import {dimensions} from '@config';

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: CustomSpacing(24),
    color: Colors.BLACK,
  },
  pokemonContainer: {
    flex: 1 / 2,
    padding: CustomSpacing(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.RED700,
    margin: CustomSpacing(5),
    height: dimensions.screenHeight * 0.5,
    borderRadius: CustomSpacing(20),
  },
  pokemonName: {
    fontWeight: 'bold',
    fontSize: CustomSpacing(20),
    color: Colors.WHITE,
  },
  textInputStyle: {
    borderWidth: 1,
    padding: CustomSpacing(10),
    borderRadius: 5,
    height: CustomSpacing(35),
  },
});

export default styles;
