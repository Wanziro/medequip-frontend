import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../../../../constants/colors';
const commonStyles = {
  backgroundColor: colors.WHITE,
  width: '50%',
  height: 100,
  borderRadius: 5,
  marginBottom: 20,
  padding: 15,
};
function AdminMenuItem({item, navigation}) {
  return (
    <View
      style={
        item.index % 2 === 0
          ? {...commonStyles, marginRight: 10}
          : {...commonStyles, marginLeft: 10}
      }>
      <TouchableOpacity
        onPress={() =>
          item.item.routeName !== '' && navigation.navigate(item.item.routeName)
        }>
        <Text style={{color: colors.BLACK}}>{item.item.title}</Text>
        <Text
          style={{
            color: colors.RED,
            fontWeight: '500',
            fontSize: 25,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {item.item.size}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AdminMenuItem;
