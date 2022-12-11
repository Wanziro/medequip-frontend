import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;

function UsersLoader() {
  return (
    <>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginBottom: 15, width: '100%'}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
    </>
  );
}

export default UsersLoader;
