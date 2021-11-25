import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Animated,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';

import bitcoin from '../../assets/lottie/5638-bitcoin (1).json';

const Header = ({ formatEmail }: { formatEmail: string }) => {
  const progress = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.header}>
      <Image
        style={styles.img}
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1358860486914236416/xt-FYxGU_400x400.png',
        }}
      />
      <Text style={styles.username}>{formatEmail}'s portfolio</Text>
      <View>
        <LottieView
          progress={progress}
          source={bitcoin}
          style={styles.lottie}
          speed={0.2}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    left: -70,
    top: 10,
  },
  header: {},
  username: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 15,
    letterSpacing: 2,
    fontFamily: 'Chivo_300Light',
    fontWeight: 'bold',
    left: 10,
  },

  lottie: { height: 80, width: 80, position: 'absolute', right: -30, top: -17 },
});
