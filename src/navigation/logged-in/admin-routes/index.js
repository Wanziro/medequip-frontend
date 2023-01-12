import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Home from '../../../screens/admin/Home';
import colors from '../../../constants/colors';
import Profile from '../../../screens/profile';
import Devices from '../../../screens/admin/devices';
import AddDevice from '../../../screens/admin/devices/add-device';
import ChangePassword from '../../../screens/profile/change-password';
import UpdateUserInfo from '../../../screens/profile/update-user-info';
import TroubleShootingCategories from '../../../screens/admin/devices/troubleshooting-categories';
import AddTroubleShootingCategory from '../../../screens/admin/devices/add-troubleshooting-category';
import DeviceIssues from '../../../screens/admin/devices/device-issues';
import {flexSpace} from '../../../constants/styles';
import AddDeviceIssue from '../../../screens/admin/devices/add-device-issue';
import TroubleshootingSteps from '../../../screens/admin/devices/troubleshooting-steps';
import AddTroubleshootingStep from '../../../screens/admin/devices/add-troubleshooting-step';
import EditStep from '../../../screens/admin/devices/edit-step';
import Users from '../../../screens/admin/users';
import AddUser from '../../../screens/admin/users/add-user';
import EditStepItem from '../../../screens/admin/devices/edit-step-item';
import Reports from '../../../screens/admin/reports';
import Preview from '../../../screens/admin/reports/preview';
import SpareParts from '../../../screens/admin/spare-parts';
import AddSparePart from '../../../screens/admin/spare-parts/add-new';
import EditSparePart from '../../../screens/admin/spare-parts/edit-spare-part';
import SerialNumbers from '../../../screens/admin/serial-numbers';
import AddSerialNumber from '../../../screens/admin/serial-numbers/add-new';
import EditSerialNumber from '../../../screens/admin/serial-numbers/edit-serial-number';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const TopTab = createMaterialTopTabNavigator();

// function OrderTabs() {
//   return (
//     <TopTab.Navigator
//       initialRouteName="PendingOrders"
//       screenOptions={{
//         tabBarActiveTintColor: colors.BLUE,
//         tabBarInactiveTintColor: colors.NIGHER_RIDER,
//       }}>
//       <TopTab.Screen
//         options={{tabBarLabel: 'Pending'}}
//         name="PendingOrders"
//         component={Orders}
//       />
//       <TopTab.Screen
//         options={{tabBarLabel: 'Failed'}}
//         name="CancelledOrders"
//         component={CancelledOrders}
//       />
//       <TopTab.Screen
//         options={{tabBarLabel: 'Success'}}
//         name="SuccessfullOrders"
//         component={SuccessfullOrders}
//       />
//     </TopTab.Navigator>
//   );
// }

const HomeTabs = ({navigation}) => {
  const {companyName, fullName} = useSelector(state => state.user);
  const [activeColor, setActiveColor] = useState(colors.BLUE);
  const [inactiveColor, setInactiveColor] = useState(colors.GREY_BUNKER);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          height: 55,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route, navigation}) => ({
          headerShown: false,
          headerTitle: fullName + ' ' + companyName,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Search')}>
              <View style={{paddingRight: 10}}>
                <Icon name="search" color={colors.BLUE} size={30} />
              </View>
            </Pressable>
          ),
          headerTintColor: colors.BLUE,
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="home" color={color} size={30} />;
          },
        })}
      />
      <Tab.Screen
        name="Devices"
        component={Devices}
        options={{
          headerShown: true,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('AddDevice')}>
              <View style={{paddingRight: 15}}>
                <Icon3 name="plus" color={colors.WHITE} size={30} />
              </View>
            </Pressable>
          ),
          headerTitle: 'Devices',
          headerTintColor: colors.WHITE,
          headerStyle: {backgroundColor: colors.BLUE},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon2 name="multi-select" color={color} size={30} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: 'My Profile',
          headerTintColor: colors.WHITE,
          headerStyle: {backgroundColor: colors.BLUE},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="person" color={color} size={30} />;
          },
        }}
      />

      {/*  <Tab.Screen
        name="Ord"
        component={OrderTabs}
        options={{
          tabBarLabel: 'Orders',
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="cart" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon2 name="gear" color={color} size={size} />;
          },
        }}
      />
       */}
    </Tab.Navigator>
  );
};

const AdminRoutes = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.BACKGROUND_COLOR}
        barStyle="light-content"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs1"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddDevice"
          component={AddDevice}
          options={{
            title: 'Record new device',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: 'Change password',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="UpdateUserInfo"
          component={UpdateUserInfo}
          options={{
            title: 'Update user information',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="TroubleShootingCategories"
          component={TroubleShootingCategories}
          options={({route, navigation}) => ({
            headerRight: () => (
              <Pressable
                onPress={() =>
                  navigation.navigate('AddTroubleShootingCategory', {
                    deviceName: route.params.deviceName,
                    deviceId: route.params.deviceId,
                  })
                }>
                <View style={{paddingRight: 15}}>
                  <Icon3 name="plus" color={colors.WHITE} size={30} />
                </View>
              </Pressable>
            ),
            title: 'Devices / ' + route.params.deviceName,
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="AddTroubleShootingCategory"
          component={AddTroubleShootingCategory}
          options={{
            title: 'New troubleshooting category',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="DeviceIssues"
          component={DeviceIssues}
          options={({route, navigation}) => ({
            headerRight: () => (
              <View style={{...flexSpace}}>
                <Pressable
                  style={{marginRight: 10}}
                  onPress={() => navigation.navigate('Home')}>
                  <View style={{paddingRight: 15}}>
                    <Icon name="home" color={colors.WHITE} size={30} />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate('AddDeviceIssue', {
                      deviceName: route.params.deviceName,
                      deviceId: route.params.deviceId,
                      categoryName: route.params.categoryName,
                      categoryId: route.params.categoryId,
                    })
                  }>
                  <View style={{paddingRight: 15}}>
                    <Icon3 name="plus" color={colors.WHITE} size={30} />
                  </View>
                </Pressable>
              </View>
            ),
            title: 'Possible issues',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="TroubleshootingSteps"
          component={TroubleshootingSteps}
          options={({route, navigation}) => ({
            headerRight: () => (
              <View style={{...flexSpace}}>
                <Pressable
                  style={{marginRight: 10}}
                  onPress={() => navigation.navigate('Home')}>
                  <View style={{paddingRight: 15}}>
                    <Icon name="home" color={colors.WHITE} size={30} />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate('AddTroubleshootingStep', {
                      deviceName: route.params.deviceName,
                      deviceId: route.params.deviceId,
                      categoryName: route.params.categoryName,
                      categoryId: route.params.categoryId,
                      issueId: route.params.issueId,
                      issueTitle: route.params.issueTitle,
                    })
                  }>
                  <View style={{paddingRight: 15}}>
                    <Icon3 name="plus" color={colors.WHITE} size={30} />
                  </View>
                </Pressable>
              </View>
            ),
            title: 'Troubleshooting steps',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="AddTroubleshootingStep"
          component={AddTroubleshootingStep}
          options={{
            title: '',
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="EditStep"
          component={EditStep}
          options={{
            title: '',
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="EditStepItem"
          component={EditStepItem}
          options={{
            title: 'Edit Step Item',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="AddDeviceIssue"
          component={AddDeviceIssue}
          options={{
            title: 'Record new device issue',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="Users"
          component={Users}
          options={({route, navigation}) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('AddUser')}>
                <View style={{paddingRight: 15}}>
                  <Icon3 name="plus" color={colors.WHITE} size={30} />
                </View>
              </Pressable>
            ),
            title: 'System users',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{
            title: 'Add new user',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="Reports"
          component={Reports}
          options={{
            title: 'Reports',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={{
            title: 'PDF',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="SpareParts"
          component={SpareParts}
          options={({route, navigation}) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('AddSparePart')}>
                <View style={{paddingRight: 10}}>
                  <Icon3 name="plus" color={colors.WHITE} size={30} />
                </View>
              </Pressable>
            ),
            title: 'Spare Parts',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="AddSparePart"
          component={AddSparePart}
          options={{
            title: 'Add spare part',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="EditSparePart"
          component={EditSparePart}
          options={{
            title: 'Edit spare part',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />

        <Stack.Screen
          name="SerialNumbers"
          component={SerialNumbers}
          options={({route, navigation}) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('AddSerialNumber')}>
                <View style={{paddingRight: 10}}>
                  <Icon3 name="plus" color={colors.WHITE} size={30} />
                </View>
              </Pressable>
            ),
            title: 'Serial Numbers',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="AddSerialNumber"
          component={AddSerialNumber}
          options={{
            title: 'Add Serial Number',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        <Stack.Screen
          name="EditSerialNumber"
          component={EditSerialNumber}
          options={{
            title: 'Edit Serial Number',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          }}
        />
        {/*  <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            title: 'Edit Product',
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: '',
            headerShown: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminRoutes;
