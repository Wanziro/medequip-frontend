import React from 'react';
import {Text, View} from 'react-native';
import colors from '../../../constants/colors';
import {flexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

function UserItem({user, navigation}) {
  return (
    <Pressable onPress={() => navigation.navigate('ChattMessages', {user})}>
      <View
        style={{
          ...flexSpace,
          borderBottomWidth: 1,
          borderBottomColor: colors.BORDER_COLOR,
          marginBottom: 10,
          paddingBottom: 10,
        }}>
        <View
          style={{
            backgroundColor: colors.BLUE,
            padding: 10,
            borderRadius: 100,
          }}>
          <Icon name="user" size={30} color={colors.WHITE} />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{fontWeight: '600', fontSize: 18, color: colors.BLACK}}>
            {user.fullName}
          </Text>
          <Text style={{fcolor: colors.TEXT_COLOR}}>
            {user.email} | {user.companyName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default UserItem;
