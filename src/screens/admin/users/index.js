import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers} from '../../../actions/appUsers';
import colors from '../../../constants/colors';
import FullPageLoader from '../../full-page-loader';

function Users() {
  const dispatch = useDispatch();
  const {users, isLoading} = useSelector(state => state.appUsers);
  //   const header = ['No', 'Names', 'Email', 'Hospital', 'OTP'];
  const header = ['No', 'Email', 'Hospital', 'OTP'];

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.dataWrapper}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={header} style={styles.head} textStyle={styles.text} />
          {users.map((item, index) => (
            <Row
              key={index}
              data={[
                index + 1,
                // item.fullName,
                item.email,
                item.companyName,
                item.otp,
              ]}
              textStyle={{textAlign: 'center', color: colors.BLACK}}
              style={styles.row}
            />
          ))}
        </Table>
      </ScrollView>
      {users.length === 0 && <FullPageLoader isLoading={isLoading} />}
    </View>
  );
}

export default Users;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f2f2f2'},
  row: {minHeight: 28, flexDirection: 'row'},
  text: {textAlign: 'center', color: colors.BLACK},
  dataWrapper: {marginTop: -1},
});
