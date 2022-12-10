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
const {width} = Dimensions.get('window');
function Home({navigation}) {
  const dispatch = useDispatch();
  const {fullName} = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchDB());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch(fetchDB());
  }, []);

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
                    fontWeight: '600',
                  }}>
                  MOBILE MERS
                </Text>
                <Text
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
            <IssueCategories navigation={navigation} />
            <Text style={{color: colors.ORANGE}}>LATEST DEVICE ISSUES</Text>
            <LatestDeviceIssues navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Home;
