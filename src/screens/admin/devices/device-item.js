import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {flexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import colors from '../../../constants/colors';

function DeviceItem({item}) {
  return (
    <View
      style={{
        ...flexSpace,
        backgroundColor: colors.WHITE,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      }}>
      <Pressable onPress={() => {}}>
        <Icon name="clapperboard" size={30} color={colors.RED} />
      </Pressable>
      <Pressable style={{flex: 1, paddingHorizontal: 10}} onPress={() => {}}>
        <View>
          <Text style={{color: colors.BLACK, fontSize: 20}}>{item.name}</Text>
          <Text>Date Created: {new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      </Pressable>
      <View>
        <Icon2 name="trash" size={30} />
      </View>
    </View>
  );
}

export default DeviceItem;
