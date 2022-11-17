import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../../constants/colors';
import Loader from '../Loader';
import IssueItem from './issueItem';

function DeviceIssues({navigation, route}) {
  const {deviceName, deviceId, categoryName, categoryId} = route.params;
  const {isLoading, issues} = useSelector(state => state.deviceIssues);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          paddingVertical: 20,
        }}>
        <ScrollView>
          <Text
            style={{
              color: colors.BLACK,
              fontSize: 18,
              paddingHorizontal: 10,
              marginBottom: 15,
            }}>
            {deviceName} / {categoryName}
          </Text>
          {isLoading && issues.length === 0 ? (
            <Loader />
          ) : (
            issues
              .filter(
                item =>
                  item.deviceId == deviceId && item.categoryId == categoryId,
              )
              .map((item, i) => (
                <IssueItem
                  item={item}
                  key={i}
                  navigation={navigation}
                  deviceName={deviceName}
                  deviceId={deviceId}
                  categoryName={categoryName}
                  categoryId={categoryId}
                />
              ))
          )}
        </ScrollView>
      </View>
    </>
  );
}

export default DeviceIssues;
