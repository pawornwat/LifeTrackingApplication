import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';

const LocationScreen = () => {
  return (
    <View>
      <MapView
        style={styled.map}
        initialRegion={{
          latitude: 13.8583,
          longitude: 100.4688,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: 13.8583,
            longitude: 100.4688,
          }}
          title={'เคยมาที่นี่'}
          description={'บันทึกความทรงจำดีๆ'}
        />
        <MapView.Marker
          coordinate={{
            latitude: 13.738109915110693,
            longitude: 100.63426494887379,
          }}
          title={'My marker title'}
          description={'My marker description'}
        />
      </MapView>
    </View>
  );
};
const styled = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
export default LocationScreen;
