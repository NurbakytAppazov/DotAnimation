import React, { useRef, useState } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const CIRCLE_SIZE = 80;

const Circle = ({onPress, animatedValue}) => {
  const containerBg = animatedValue.interpolate({
    inputRange: [0, 0.5, 0.501, 1],
    outputRange: ['gold', 'gold', '#444', '#444']
  })
  const circleBg = animatedValue.interpolate({
    inputRange: [0, 0.5, 0.501, 1],
    outputRange: ['#444', '#444', 'gold', 'gold']
  })

  return (
    <Animated.View
      style={{...styles.circleContainer, ...{
        backgroundColor: containerBg
      }}}
    >
      <Animated.View
        style={{...styles.circle, ...{
          backgroundColor: circleBg,
          transform: [
            { perspective: 300 },
            {
              rotateY: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0deg', '-90deg', '-180deg']
              })
            },
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 8, 1]
              })
            },
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0%', '50%', '0%']
              })
            }
          ]
        }}}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={{...styles.circle, ...styles.circleBtn}}/>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

export default function App() {
  const [index, setIndex] = useState(0)
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = toValue => Animated.timing(animatedValue, {
    toValue,
    duration: 1000,
    easing: Easing.ease,
    useNativeDriver: false
  })
  const onPress = () => {
    setIndex(index === 0 ? 1 : 0)
    animation(index === 0 ? 1 : 0).start();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 8,
    paddingBottom: 100,
    ...StyleSheet.absoluteFillObject
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: '#444',
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleBtn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
