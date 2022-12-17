import React, {useState, useEffect} from 'react';
import {Button, View, ToastAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import FullPageLoader from '../../full-page-loader';
import Axios from 'axios';
import {backendUrl} from '../../../constants/app';
import {setAddUsers, setLoadingUsers} from '../../../actions/appUsers';
import {toastMessage} from '../../../helpers';

function Reports({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const systemUsersReport = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(backendUrl + '/users/?token=' + user.token);
      dispatch(setLoadingUsers(false));
      dispatch(setAddUsers(res.data.users));
      let html = `
    <h1>App Users Report</h1>
    <table border='1' cellspacing='0' cellpadding='0'>
    <tr>
    <th>#</th>
    <th>Names</th>
    <th>Email</th>
    <th>Hospital</th>
    <th>OTP</th>
    <th>OTP Status</th>
    <th>Registration date</th>
    </tr>
    `;
      for (let i = 0; i < res.data.users.length; i++) {
        html += `
        <td>${i + 1}</td>
        <td>${res.data.users[i].fullName}</td>
        <td>${res.data.users[i].email}</td>
        <td>${res.data.users[i].companyName}</td>
        <td>${res.data.users[i].otp}</td>
        <td>${res.data.users[i].otpUsed ? 'USED' : 'NOT USED'}</td>
        <td>${new Date(res.data.users[i].createdAt).toLocaleString()}</td>
        </tr>
        `;
      }
      html += '</table>';
      let options = {
        html,
        fileName: 'App users report ' + new Date().getTime().toLocaleString(),
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
      dispatch(setLoadingUsers(false));
      errorHandler(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={{padding: 20, backgroundColor: colors.BG_GRAY}}>
      <View style={{marginBottom: 15}}>
        <Button
          title="App users"
          onPress={() => {
            systemUsersReport();
          }}
        />
      </View>
      <View style={{marginBottom: 15}}>
        <Button title="Troubleshooted devices" onPress={() => {}} />
      </View>
      <View style={{marginBottom: 15}}>
        <Button title="Tickets" onPress={() => {}} />
      </View>
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
}

export default Reports;
