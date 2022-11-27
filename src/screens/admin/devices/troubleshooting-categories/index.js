import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDeviceIssues} from '../../../../actions/deviceIssues';
import {fetchTroubleshootingcategories} from '../../../../actions/troubleShootingCategories';
import colors from '../../../../constants/colors';
import FullPageLoader from '../../../full-page-loader';
import CategoryItem from './categoryItem';
import LoaderItem from './loaderItem';

const placeholderList = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
  {id: 11},
  {id: 12},
];

function TroubleShootingCategories({navigation, route}) {
  const {deviceName, deviceId} = route.params;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const dispatch = useDispatch();
  const {isLoading, categories} = useSelector(
    state => state.troubleShootingCategories,
  );
  const {issues} = useSelector(state => state.deviceIssues);

  useEffect(() => {
    dispatch(fetchTroubleshootingcategories());
    dispatch(fetchDeviceIssues());
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Text style={{color: colors.BLACK, marginBottom: 5}}>
          Devices / {deviceName} / Troubleshooting categories
        </Text>
        {isLoading && categories.length === 0 ? (
          <FlatList
            data={placeholderList}
            showsVerticalScrollIndicator={false}
            renderItem={(item, index) => <LoaderItem item={item} />}
            numColumns={2}
            style={{padding: 10}}
          />
        ) : (
          <FlatList
            data={categories.filter(item => item.deviceId == deviceId)}
            showsVerticalScrollIndicator={false}
            renderItem={(item, index) => (
              <CategoryItem
                item={item}
                navigation={navigation}
                setIsLoading={setIsLoadingData}
                deviceName={deviceName}
                issues={issues}
              />
            )}
            numColumns={2}
            style={{padding: 10}}
          />
        )}
        <FullPageLoader isLoading={isLoadingData} />
      </View>
    </>
  );
}

export default TroubleShootingCategories;
