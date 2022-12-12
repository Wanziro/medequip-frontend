import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../../constants/colors';
import {flexSpace} from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/AntDesign';

function ChattHeader({user}) {
  return (
    <View style={{...flexSpace, width: '85%', paddingLeft: 10}}>
      <View>
        <Text style={{color: colors.WHITE, fontSize: 16}}>{user.fullName}</Text>
        <Text style={{color: colors.WHITE, opacity: 0.7}} numberOfLines={1}>
          @{user.email.split('@')[0]} | {user.companyName}
        </Text>
      </View>
      <View
        style={{backgroundColor: colors.WHITE, padding: 5, borderRadius: 100}}>
        <Icon name="user" size={25} color={colors.BLUE} />
      </View>
    </View>
  );
}

export default ChattHeader;
