import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

export default function Avatar({ konusuyorMu }) {
  const agizAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    let anim;
    if (konusuyorMu) {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(agizAnim, {
            toValue: 1,
            duration: 180,
            useNativeDriver: false,
            easing: Easing.linear,
          }),
          Animated.timing(agizAnim, {
            toValue: 0.5,
            duration: 180,
            useNativeDriver: false,
            easing: Easing.linear,
          }),
        ])
      );
      anim.start();
    } else {
      agizAnim.setValue(0.5);
      if (anim) anim.stop();
    }
    return () => { if (anim) anim.stop(); };
  }, [konusuyorMu]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/avatar.json')}
        autoPlay={konusuyorMu}
        loop={konusuyorMu}
        style={styles.avatar}
        {...(!konusuyorMu && { progress: 0 })}
      />
      {/* Ağız efekti */}
      <Animated.View
        style={[
          styles.agiz,
          {
            transform: [
              { scaleX: agizAnim },
              { scaleY: agizAnim.interpolate({ inputRange: [0.5, 1], outputRange: [0.5, 1] }) },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
  },
  agiz: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 60,
    height: 20,
    backgroundColor: '#a0522d',
    borderRadius: 20,
    opacity: 0.8,
    zIndex: 2,
    alignSelf: 'center',
  },
}); 