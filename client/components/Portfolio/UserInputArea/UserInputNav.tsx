import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icons from '../../../constants/Icons';
import TabIcon4 from '../../TabIcons/TabIcon4';
import Assets from '../Assets/Assets';
import UserInput from './UserInput';

const UserInputNav = ({ coinValues }) => {
  const [isClicked, setisClicked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addPosition}>
        <TouchableOpacity
          onPress={() => {
            setisClicked(!isClicked);
          }}
        >
          {isClicked ? (
            <View style={styles.row}>
              <Text style={styles.addText}>Add Coins</Text>
              <TabIcon4 icon={Icons.addCoin} />
            </View>
          ) : (
            <View style={styles.row}>
              <Text style={styles.asset}>View Transactions...</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {!isClicked ? <UserInput coinValues={coinValues} /> : <Assets />}
    </SafeAreaView>
  );
};

export default UserInputNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  row: { flexDirection: 'row' },

  addPosition: { position: 'absolute', bottom: 10, right: 70 },

  addText: {
    color: '#fff',
    paddingTop: 10,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1,
    textAlign: 'center',
    fontSize: 18,
    opacity: 0.7,
    position: 'absolute',
    left: 100,
    bottom: -5,
  },
  asset: {
    color: '#fff',
    paddingTop: 10,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 1,
    textAlign: 'center',
    fontSize: 18,
    opacity: 0.5,
    left: 40,
  },
});
