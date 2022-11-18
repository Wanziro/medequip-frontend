import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import colors from '../../../../constants/colors';
import FullPageLoader from '../../../full-page-loader';
import StepItem from './stepItem';
import Axios from 'axios';
import {backendUrl} from '../../../../constants/app';
import {errorHandler} from '../../../../helpers';
import {useSelector} from 'react-redux';

function TroubleshootingSteps({navigation, route}) {
  const {token} = useSelector(state => state.user);
  const {deviceName, deviceId, categoryName, categoryId, issueId, issueTitle} =
    route.params;
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    Axios.get(
      backendUrl + '/troubleshootingSteps/' + issueId + '/?token=' + token,
    )
      .then(res => {
        setRefreshing(false);
        setSteps(res.data.troubleShootingSteps);
      })
      .catch(error => {
        errorHandler(error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    Axios.get(
      backendUrl + '/troubleshootingSteps/' + issueId + '/?token=' + token,
    )
      .then(res => {
        setIsLoading(false);
        setSteps(res.data.troubleShootingSteps);
      })
      .catch(error => {
        errorHandler(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingVertical: 20,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          style={{
            color: colors.BLACK,
            fontSize: 18,
            paddingHorizontal: 10,
            marginBottom: 15,
          }}>
          {deviceName} / {categoryName} / {issueTitle} / Troubleshooting Steps
        </Text>
        {steps.map((item, i) => (
          <StepItem
            item={item}
            key={i}
            index={i}
            params={route.params}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      <FullPageLoader isLoading={isLoading} />
    </View>
  );
}

export default TroubleshootingSteps;
