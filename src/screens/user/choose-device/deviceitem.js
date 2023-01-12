import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {flexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import colors from '../../../constants/colors';
import {useDispatch} from 'react-redux';
import {setSelectedDevice} from '../../../actions/user';

function DeviceItem({item, navigation, index}) {
  const dispatch = useDispatch();

  return (
    <>
      <View
        style={{
          ...flexSpace,
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setSelectedDevice(index));
            setTimeout(() => {
              navigation.goBack();
            }, 500);
          }}>
          <Icon name="devices" size={50} color={colors.BLUE} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, paddingHorizontal: 10}}
          onPress={() => {
            dispatch(setSelectedDevice(index));
            setTimeout(() => {
              navigation.goBack();
            }, 500);
          }}>
          <View>
            <Text style={{color: colors.BLACK, fontSize: 20}}>{item.name}</Text>
            <Text>
              Date Created: {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default DeviceItem;
