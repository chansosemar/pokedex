import React from 'react';
import {View} from 'react-native';
import {safeAreaHeight, phoneType} from '@config';
import {CustomSpacing} from '@styles';

interface Props {
  width?: number;
  height?: number;
  topSafeAreaHeight?: boolean;
  bottomSafeAreaHeight?: boolean;
}

const Spacer = ({
  width,
  height,
  topSafeAreaHeight,
  bottomSafeAreaHeight,
}: Props) => {
  if (width) {
    return <View style={{width}} />;
  }

  if (height) {
    return <View style={{height}} />;
  }

  if (topSafeAreaHeight) {
    return <View style={{height: safeAreaHeight[phoneType()].top}} />;
  }

  if (bottomSafeAreaHeight) {
    return (
      <View
        style={{
          height: safeAreaHeight[phoneType()].bottom || CustomSpacing(24),
        }}
      />
    );
  }

  return <View style={{flex: 1}} />;
};

Spacer.defaultProps = {
  width: undefined,
  height: undefined,
  topSafeAreaHeight: undefined,
  bottomSafeAreaHeight: undefined,
};

export default Spacer;
