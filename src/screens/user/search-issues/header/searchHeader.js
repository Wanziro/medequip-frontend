import React, {useEffect, useRef} from 'react';
import {View, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setIssueKeyWord} from '../../../../actions/keywords';
import colors from '../../../../constants/colors';

function SearchHeader() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const {issueKeyword} = useSelector(state => state.keywords);
  useEffect(() => {
    dispatch(setIssueKeyWord(''));
    setTimeout(() => {
      inputRef.current.focus();
    }, 500);
  }, []);
  return (
    <View style={{width: '87%', paddingLeft: 10}}>
      <TextInput
        placeholder="Search for issues"
        value={issueKeyword}
        ref={inputRef}
        onChangeText={text => dispatch(setIssueKeyWord(text))}
        style={{
          backgroundColor: colors.WHITE,
          paddingVertical: 5,
          paddingHorizontal: 15,
          width: '100%',
          borderRadius: 100,
          color: colors.TEXT_COLOR,
        }}
      />
    </View>
  );
}

export default SearchHeader;
