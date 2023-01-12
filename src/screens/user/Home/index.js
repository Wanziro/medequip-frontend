import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {flexSpace} from '../../../constants/styles';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import colors from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDB} from '../../../actions/db';
import LatestDeviceIssues from './latest-device-issues';
import IssueCategories from './issue-categories/issueCategories';
import {validateSelectedDevice} from '../../../helpers';
import {fetchSerialNumbersSilent} from '../../../actions/serialNumbers';
const {width} = Dimensions.get('window');
function Home({navigation}) {
  const dispatch = useDispatch();
  const {fullName, selectedDevice} = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const db = useSelector(state => state.db);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchDB());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch(fetchDB());
    dispatch(fetchSerialNumbersSilent());
  }, []);

  useEffect(() => {
    if (!db.isLoading) {
      if (!validateSelectedDevice(db.db, selectedDevice)) {
        navigation.navigate('ChooseDevice');
      }
    }
  }, [db.isLoading]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1, backgroundColor: colors.BG_GRAY}}>
        {/* header */}
        <View
          style={{
            minHeight: 200,
            borderBottomRightRadius: 50,
            position: 'relative',
          }}>
          <Image
            source={require('../../../../assets/bg.jpg')}
            style={{width, height: 200, borderBottomRightRadius: 50}}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              width,
              height: '100%',
              borderBottomRightRadius: 50,
              paddingHorizontal: 10,
              paddingVertical: 30,
            }}>
            <View style={{position: 'relative', height: '100%', marginTop: 30}}>
              <View style={{...flexSpace}}>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                  <View
                    style={{
                      backgroundColor: colors.WHITE,
                      padding: 10,
                      borderRadius: 100,
                    }}>
                    <Icon name="user" size={30} color={colors.BLUE} />
                  </View>
                </Pressable>
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <Text
                    style={{
                      color: colors.WHITE,
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    MobileMERS
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SearchIssues')}>
                  <View>
                    <Icon name="search1" size={30} color={colors.WHITE} />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{bottom: 0, position: 'absolute', paddingBottom: 10}}>
                <Text
                  style={{
                    color: colors.WHITE,
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  Medical Equipment Repair System
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: colors.BLACK,
                    fontSize: 30,
                    fontWeight: '600',
                  }}>
                  {fullName}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* header */}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{padding: 10, flex: 1}}>
            <Pressable onPress={() => navigation.navigate('ChooseDevice')}>
              {selectedDevice !== '' ? (
                <View style={{...flexSpace, marginBottom: 15}}>
                  <View>
                    <Text style={{fontSize: 12, color: colors.TEXT_COLOR}}>
                      Selected Device
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: colors.BLACK,
                      }}>
                      {db.db[selectedDevice]?.name}
                    </Text>
                  </View>
                  <View>
                    <Icon name="down" color={colors.BLACK} size={30} />
                  </View>
                </View>
              ) : (
                <Text>No selected device</Text>
              )}
            </Pressable>
            <IssueCategories navigation={navigation} />
            <Text style={{color: colors.ORANGE}}>LATEST ISSUES</Text>
            <LatestDeviceIssues navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Home;
