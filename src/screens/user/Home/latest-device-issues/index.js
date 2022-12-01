import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import DeviceLoader from './deviceLoader';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import colors from '../../../../constants/colors';
import {flexSpace} from '../../../../constants/styles';

function LatestDeviceIssues({navigation}) {
  const {db, isLoading, loadingDbError} = useSelector(state => state.db);
  return (
    <View style={{marginTop: 15, flex: 1}}>
      {db.length === 0 && isLoading ? (
        <DeviceLoader />
      ) : db.length === 0 && loadingDbError === '' ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="warning" size={30} color={colors.RED} />
          <Text style={{color: colors.RED, marginTop: 10}}>
            {loadingDbError}
          </Text>
        </View>
      ) : db.length > 0 ? (
        db[0].deviceIssues.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('IssueSteps', {
                issueId: item._id,
                deviceId: item.deviceId,
              })
            }>
            <View
              style={
                index % 2 === 0 ? styles.evenContainer : styles.oddContainer
              }>
              <View style={{...flexSpace}}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Text
                    style={{
                      color: colors.WHITE,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: index % 2 === 0 ? colors.GAINSBORO : colors.BLACK,
                      opacity: 0.8,
                    }}>
                    {item.summary}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 100,
                    borderColor: colors.WHITE,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                  }}>
                  <Text
                    style={{
                      color: colors.WHITE,
                    }}>
                    {
                      db[0].troubleshootingSteps.filter(
                        i => i.issueId == item._id,
                      ).length
                    }
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <>
          <Text>No devices found</Text>
        </>
      )}
    </View>
  );
}

export default LatestDeviceIssues;

const styles = StyleSheet.create({
  evenContainer: {
    backgroundColor: colors.BLUE,
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  oddContainer: {
    backgroundColor: colors.PURPLE,
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
});
