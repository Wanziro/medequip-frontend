import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Home from '../../../screens/user/Home';
import colors from '../../../constants/colors';
import Profile from '../../../screens/profile';
import ChangePassword from '../../../screens/profile/change-password';
import UpdateUserInfo from '../../../screens/profile/update-user-info';
import IssueSteps from '../../../screens/user/issue-steps';
import Chat from '../../../screens/user/chat';
import SearchIssues from '../../../screens/user/search-issues';
import SearchHeader from '../../../screens/user/search-issues/header/searchHeader';
import IssuesPerCategory from '../../../screens/user/issues-per-category';
import UsersList from '../../../screens/user/users-list';
import ChattHeader from '../../../screens/user/chat-messages/chatt-header';
import ChattMessages from '../../../screens/user/chat-messages';
import ChooseDevice from '../../../screens/user/choose-device';
import Preview from '../../../screens/admin/reports/preview';

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
        headerShadowVisible: false,
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
        name="Chat"
        component={Chat}
        options={{
          headerShown: true,
          headerTitle: 'Chat Box',
          headerTintColor: colors.WHITE,
          headerStyle: {backgroundColor: colors.BLUE},
          headerTitleAlign: 'center',
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="chatbubbles" color={color} size={30} />;
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

const UserRoutes = () => {
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
          name="IssueSteps"
          component={IssueSteps}
          options={{
            headerTransparent: true,
            title: 'Troubleshooting steps',
            headerShadowVisible: false,
            headerTintColor: colors.WHITE,
          }}
        />
        <Stack.Screen
          name="SearchIssues"
          component={SearchIssues}
          options={({route, navigation}) => ({
            headerRight: () => <SearchHeader />,
            title: '',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="IssuesPerCategory"
          component={IssuesPerCategory}
          options={({route, navigation}) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchIssues')}>
                <Icon2 name="search1" size={30} color={colors.WHITE} />
              </TouchableOpacity>
            ),
            title: route.params.categoryName,
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="UsersList"
          component={UsersList}
          options={({route, navigation}) => ({
            title: 'Select User To Chat With',
            headerTitleAlign: 'center',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.BLUE},
          })}
        />
        <Stack.Screen
          name="ChattMessages"
          component={ChattMessages}
          options={({route, navigation}) => ({
            headerRight: () => <ChattHeader user={route.params.user} />,
            headerStyle: {backgroundColor: colors.BLUE},
            title: '',
            headerTintColor: colors.WHITE,
          })}
        />
        <Stack.Screen
          name="ChooseDevice"
          component={ChooseDevice}
          options={{
            title: 'Select Device',
            headerStyle: {backgroundColor: colors.BLUE},
            headerTintColor: colors.WHITE,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserRoutes;
