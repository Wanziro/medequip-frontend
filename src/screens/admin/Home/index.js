import React from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {flexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import colors from '../../../constants/colors';
import AdminMenuItem from './menu-item';

const adminMenuList = [
  {
    title: 'Users',
    size: 0,
    routeName: '',
  },
  {
    title: 'Devices',
    size: 0,
    routeName: '',
  },
  {
    title: 'Spare parts',
    size: 0,
    routeName: '',
  },
  {
    title: 'Tickets',
    size: 0,
    routeName: '',
  },
];

function Home({navigation}) {
  const {role, fullName} = useSelector(state => state.user);

  return (
    <View style={{backgroundColor: colors.RED, flex: 1}}>
      <StatusBar backgroundColor={colors.RED} />
      <View style={{padding: 10}}>
        <View style={{...flexSpace}}>
          <View>
            <Text style={{color: colors.WHITE}}>Welcome {role}</Text>
            <Text
              style={{color: colors.WHITE, fontWeight: '600', fontSize: 25}}>
              {fullName}
            </Text>
          </View>
          <View>
            <Icon
              name="ios-person-circle-outline"
              size={60}
              style={{color: colors.WHITE}}
            />
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: colors.WHITE, fontSize: 18}}>
            Medequip repair administration
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.BG_GRAY,
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
        }}>
        <FlatList
          data={adminMenuList}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => (
            <AdminMenuItem item={item} navigation={navigation} />
          )}
          numColumns={2}
          style={{padding: 10}}
        />
      </View>
    </View>
  );
}

export default Home;
