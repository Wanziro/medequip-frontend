import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../../constants/colors';
const commonStyles = {
  // backgroundColor: colors.WHITE,
  width: '50%',
  borderRadius: 5,
  marginBottom: 20,
  padding: 5,
};
function LoaderItem({item}) {
  return (
    <View
      style={
        item.index % 2 === 0
          ? {...commonStyles, marginRight: 10}
          : {...commonStyles, marginLeft: 10}
      }>
      <SkeletonPlaceholder speed={900}>
        <View style={{height: 60, borderRadius: 10}}></View>
      </SkeletonPlaceholder>
    </View>
  );
}

export default LoaderItem;
