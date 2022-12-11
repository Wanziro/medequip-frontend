import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsersSilent} from '../../../actions/appUsers';
import colors from '../../../constants/colors';
import UsersLoader from './loader';
import UserItem from './userItem';

function UsersList({navigation}) {
  const dispatch = useDispatch();
  const {users, isLoading} = useSelector(state => state.appUsers);
  useEffect(() => {
    dispatch(fetchUsersSilent());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      {isLoading ? (
        <UsersLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {users.map((item, index) => (
            <UserItem key={index} user={item} navigation={navigation} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default UsersList;
