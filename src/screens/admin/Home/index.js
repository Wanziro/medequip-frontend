import React from 'react';
import {View, Text, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {flexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import colors from '../../../constants/colors';
import AdminMenuItem from './menu-item';

function Home({navigation}) {
  const {role, fullName} = useSelector(state => state.user);
  const {devices} = useSelector(state => state.devices);
  const {users} = useSelector(state => state.appUsers);

  const adminMenuList = [
    {
      title: 'Users',
      size: users.length,
      routeName: 'Users',
    },
    {
      title: 'Devices',
      size: devices.length,
      routeName: 'Devices',
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

  return (
    <View style={{backgroundColor: colors.BLUE, flex: 1}}>
      <StatusBar backgroundColor={colors.BLUE} />
      <View style={{padding: 10}}>
        <View style={{...flexSpace}}>
          <View>
            <Text style={{color: colors.WHITE}}>Welcome {role}</Text>
            <Text
              style={{color: colors.WHITE, fontWeight: '600', fontSize: 25}}>
              {fullName}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View>
              <Icon name="user-cog" size={45} style={{color: colors.WHITE}} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: colors.WHITE, fontSize: 18}}>
            Mobile MERS Administration
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
