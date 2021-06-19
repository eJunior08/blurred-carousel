/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';

import {data} from './src/data';

const {width} = Dimensions.get('window');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const App = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 20,
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: imageW,
            height: imageH,
            resizeMode: 'cover',
            borderRadius: 16,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width, // Next
            index * width, // Current
            (index + 1) * width, // Previous
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{uri: image}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={50}
            />
          );
        })}
      </View>

      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={renderItem}
      />
    </View>
  );
};

export default App;
