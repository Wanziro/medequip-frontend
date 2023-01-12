import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
  Linking,
  Alert,
  ToastAndroid,
} from 'react-native';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {resetUser} from '../../actions/user';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {errorHandler, toastMessage} from '../../helpers';
import FullPageLoader from '../full-page-loader';
import Axios from 'axios';
import {backendUrl} from '../../constants/app';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const {width, height} = Dimensions.get('window');
function Profile({navigation}) {
  const userObj = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    dispatch(resetUser());
  };
  const openUrl = async () => {
    const url = 'https://avantehs.com/support';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const solvedReport = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(
        backendUrl +
          '/tickets/solved/' +
          userObj.id +
          '/?token=' +
          userObj.token,
      );
      let html = `
    <h1>Mobile MERS | Troubleshooted devices report</h1>
    <table border='1' cellspacing='0' cellpadding='5'>
    <tr>
    <th>#</th>
    <th>Serial Number</th>
    <th>Model</th>
    <th>Device Name</th>
    <th>Time Spent</th>
    <th>Cost</th> 
    <th>Solved issue</th> 
    <th>Technician's Email</th> 
    <th>Hospital</th> 
    <th>Date</th> 
    </tr>
    `;
      for (let i = 0; i < res.data.solved.length; i++) {
        html += `
        <td>${i + 1}</td>
        <td>${res.data.solved[i].serialNumber}</td>
        <td>${res.data.solved[i].clientDeviceModel}</td>
        <td>${res.data.solved[i].device.name}</td>
        <td>${res.data.solved[i].estimatedTime}</td>
        <td>${res.data.solved[i].estimatedPrice} RWF</td>
        <td>${res.data.solved[i]?.issue?.title}</td>
        <td>${res.data.solved[i]?.user?.email}</td>
        <td>${res.data.solved[i]?.user?.companyName}</td>
        <td>${new Date(res.data.solved[i].createdAt).toLocaleString()}</td>
        </tr>
        `;
      }
      html += '</table>';
      let options = {
        html,
        fileName:
          'Troubleshooted devices report ' +
          new Date().getTime().toLocaleString(),
        directory: 'Documents',
      };

      let file = await RNHTMLtoPDF.convert(options);
      // console.log(file.filePath);
      // alert(file.filePath);
      ToastAndroid.show('File saved at: ' + file.filePath, ToastAndroid.SHORT);
      toastMessage('success', 'File saved at: ' + file.filePath);
      setIsLoading(false);
      navigation.navigate('Preview', {filePath: file.filePath});
    } catch (error) {
      errorHandler(error);
      setIsLoading(false);
    }
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
            <Text style={{fontSize: 25, color: colors.BLACK}}>
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
                <Icon2 name="right" size={20} color={colors.BLACK} />
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
                <Icon2 name="right" size={20} color={colors.BLACK} />
              </View>
            </Pressable>
            {userObj.role == 'user' && (
              <>
                <View
                  style={{
                    borderColor: colors.CARD_SHADOW_COLOR,
                    borderWidth: 1,
                    marginVertical: 10,
                  }}></View>
                <Pressable onPress={() => solvedReport()}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Icon3 name="file-check" size={20} color={colors.BLACK} />
                    <Text
                      style={{
                        marginVertical: 10,
                        color: colors.BLACK,
                        fontWeight: 'bold',
                        width: '100%',
                        marginLeft: 10,
                      }}>
                      Trouble shooted devices Report
                    </Text>
                    <Icon2 name="right" size={20} color={colors.BLACK} />
                  </View>
                </Pressable>
                <Pressable onPress={() => openUrl()}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Icon3 name="help-circle" size={20} color={colors.BLACK} />
                    <Text
                      style={{
                        marginVertical: 10,
                        color: colors.BLACK,
                        fontWeight: 'bold',
                        width: '100%',
                        marginLeft: 10,
                      }}>
                      Support
                    </Text>
                    <Icon2 name="right" size={20} color={colors.BLACK} />
                  </View>
                </Pressable>
              </>
            )}
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
      <FullPageLoader isLoading={isLoading} />
    </SafeAreaView>
  );
}

export default Profile;
