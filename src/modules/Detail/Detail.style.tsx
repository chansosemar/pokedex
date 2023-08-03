import {StyleSheet} from 'react-native';
import {Colors, CustomSpacing} from '@styles';
import {dimensions} from '@config';

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
  },
  renderImage: {
    height: dimensions.screenHeight * 0.3,
    width: dimensions.screenWidth * 0.4,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: CustomSpacing(30),
    color: Colors.BLACK,
  },
  typesContainer: {
    padding: CustomSpacing(10),
    backgroundColor: Colors.RED700,
    margin: CustomSpacing(5),
    borderRadius: CustomSpacing(5),
  },
  typesTitle: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: CustomSpacing(12),
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: CustomSpacing(20),
    color: Colors.BLACK,
  },
  wrapContainer: {
    flexWrap: 'wrap',
  },
  moveContainer: {
    padding: CustomSpacing(5),
    backgroundColor: Colors.RED700,
    margin: CustomSpacing(5),
    borderRadius: CustomSpacing(5),
  },
  moveTitle: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: CustomSpacing(12),
  },
});

export default styles;
