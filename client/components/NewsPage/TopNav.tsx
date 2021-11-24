import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const TopNav = ({
  setShowNFT,
}: {
  setShowNFT: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isNft, setisNft] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={!isNft ? styles.Crypto : styles.NavItem}>
        <TouchableOpacity
          onPress={() => {
            setShowNFT(false);
            setisNft(!isNft);
          }}
        >
          <Text style={styles.NavItem}>Crypto</Text>
        </TouchableOpacity>
      </View>
      <View style={isNft ? styles.nft : styles.NavItem}>
        <TouchableOpacity
          onPress={() => {
            setShowNFT(true);
            setisNft(!isNft);
          }}
        >
          <Text style={styles.NavItem}>NFT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  pressed: {},

  Crypto: {
    borderBottomWidth: 3,
    borderBottomColor: '#b6e1f6',
    marginHorizontal: 10,

    color: '#fff',
    width: 130,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 2,
  },

  nft: {
    borderBottomWidth: 3,
    borderBottomColor: '#b6e1f6',
    marginHorizontal: 10,
    color: '#fff',
    width: 130,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 2,
  },

  NavItem: {
    color: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 0,
    overflow: 'hidden',
    width: 130,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
    fontFamily: 'Chivo_400Regular',
    letterSpacing: 2,
  },
});
