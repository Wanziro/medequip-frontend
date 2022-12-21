import React, {useState, useEffect} from 'react';
import {Button, View, ToastAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import FullPageLoader from '../../full-page-loader';
import Axios from 'axios';
import {backendUrl} from '../../../constants/app';
import {setAddUsers, setLoadingUsers} from '../../../actions/appUsers';
import {errorHandler, toastMessage} from '../../../helpers';

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
    <h1>Mobile MERS | App Users Report</h1>
    <table border='1' cellspacing='0' cellpadding='5'>
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

  const ticketsReport = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(backendUrl + '/tickets/?token=' + user.token);
      let html = `
    <h1>Mobile MERS | Tickets Report</h1>
    <table border='1' cellspacing='0' cellpadding='5'>
    <tr>
    <th>#</th>
    <th>Device Model</th>
    <th>Description</th>
    <th>User Names</th>
    <th>Email</th>
    <th>Hospital</th> 
    <th>Date</th> 
    </tr>
    `;
      for (let i = 0; i < res.data.tickets.length; i++) {
        html += `
        <td>${i + 1}</td>
        <td>${res.data.tickets[i].clientDeviceModel}</td>
        <td>${res.data.tickets[i].description}</td>
        <td>${res.data.tickets[i].user.fullName}</td>
        <td>${res.data.tickets[i].user.email}</td>
        <td>${res.data.tickets[i].user.companyName}</td>
        <td>${new Date(res.data.tickets[i].createdAt).toLocaleString()}</td>
        </tr>
        `;
      }
      html += '</table>';
      let options = {
        html,
        fileName: 'Tickets report ' + new Date().getTime().toLocaleString(),
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

  const solvedReport = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(
        backendUrl + '/tickets/solved/?token=' + user.token,
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
        <td>${res.data.solved[i].issue.title}</td>
        <td>${res.data.solved[i].user.email}</td>
        <td>${res.data.solved[i].user.companyName}</td>
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
        <Button
          title="Troubleshooted devices"
          onPress={() => {
            solvedReport();
          }}
        />
      </View>
      <View style={{marginBottom: 15}}>
        <Button
          title="Tickets"
          onPress={() => {
            ticketsReport();
          }}
        />
      </View>
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
}

export default Reports;
