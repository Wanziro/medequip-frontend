import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import colors from '../../../constants/colors';

function Chat({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        position: 'relative',
      }}>
      {/* button */}
      <View
        style={{
          position: 'absolute',
          bottom: 25,
          right: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UsersList')}
          style={{
            backgroundColor: colors.BLUE,
            padding: 15,
            borderRadius: 100,
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="plus" size={30} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
      {/* button */}
    </View>
  );
}

export default Chat;
