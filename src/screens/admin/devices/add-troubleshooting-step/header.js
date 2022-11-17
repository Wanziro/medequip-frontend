import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {flexCenter, flexSpace} from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import colors from '../../../../constants/colors';

function Header({
  navigation,
  handleSubmit,
  handleImageSelect,
  setDisableTextButton,
  disableTextButton,
}) {
  return (
    <View style={{...flexSpace, backgroundColor: colors.RED, padding: 10}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={20} style={{color: colors.WHITE}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={{...flexCenter}}>
          <Icon name="home" size={20} style={{color: colors.WHITE}} />
          <Text style={{color: colors.WHITE}}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disableTextButton}
        onPress={() => setDisableTextButton(true)}>
        <View style={{...flexCenter}}>
          <Icon name="text" size={20} style={{color: colors.WHITE}} />
          <Text style={{color: colors.WHITE}}>Add Text</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleImageSelect()}>
        <View style={{...flexCenter}}>
          <Icon name="image" size={20} style={{color: colors.WHITE}} />
          <Text style={{color: colors.WHITE}}>Add Image</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSubmit()}>
        <View style={{...flexCenter}}>
          <Icon
            name="checkmark-sharp"
            size={20}
            style={{color: colors.WHITE}}
          />
          <Text style={{color: colors.WHITE}}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
