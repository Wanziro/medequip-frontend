import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {resetUser} from '../../actions/user';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');
function Profile({navigation}) {
  const userObj = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUser());
  };
  return (
    <SafeAreaView>
      {userObj.role == 'user' ? (
        <StatusBar translucent backgroundColor="transparent" />
      ) : (
        <StatusBar backgroundColor={colors.BLUE} barStyle="light-content" />
      )}
      <View style={{backgroundColor: colors.BACKGROUND_COLOR, width, height}}>
        <View
          style={{
            backgroundColor: colors.BLUE,
            padding: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="user-circle-o" size={100} color={colors.WHITE} />
          <View style={{marginTop: 15}}>
            <Text
              style={{fontSize: 18, color: colors.WHITE, textAlign: 'center'}}>
              {userObj.fullName}
            </Text>
            <Text style={{color: colors.WHITE, textAlign: 'center'}}>
              {userObj.email}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={{padding: 15}}>
            <Text style={{fontSize: 25, marginBottom: 15, color: colors.BLACK}}>
              {userObj.companyName}
            </Text>
            {/* <Text style={{fontSize: 18, marginBottom: 15, color: colors.BLACK}}>
              {userObj.phone}
            </Text> */}
            <View
              style={{
                borderColor: colors.CARD_SHADOW_COLOR,
                borderWidth: 2,
                marginVertical: 25,
              }}></View>
            <Pressable onPress={() => navigation.navigate('UpdateUserInfo')}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Icon3 name="application-edit" size={20} color={colors.BLACK} />
                <Text
                  style={{
                    marginVertical: 10,
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  Update User Information
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ChangePassword')}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Icon3 name="lock" size={20} color={colors.BLACK} />
                <Text
                  style={{
                    marginVertical: 10,
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  Change password
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handleLogout()}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Icon2 name="logout" size={20} color={colors.BLACK} />
                <Text
                  style={{
                    marginVertical: 10,
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    width: '100%',
                    marginLeft: 10,
                  }}>
                  Logout
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
