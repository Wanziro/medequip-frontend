import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../../constants/colors';
import {flexCenter, flexSpace} from '../../../../constants/styles';

function StepItem({item, index}) {
  return (
    <View
      style={{
        ...flexSpace,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: colors.WHITE,
      }}>
      <View
        style={{
          ...flexCenter,
          backgroundColor: colors.RED,
          padding: 10,
        }}>
        <Text style={{color: colors.WHITE, fontSize: 18}}>{index + 1}</Text>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <Text style={{color: colors.BLACK, fontSize: 16}}>{item.title}</Text>
        <Text style={{color: colors.TEXT_COLOR}}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

export default StepItem;
