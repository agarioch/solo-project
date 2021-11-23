import React from 'react';
import { StyleSheet, Keyboard, TextInput, SafeAreaView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const CoinSearch = ({ input, filterCoins }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.searchContainer}>
        <TextInput
          value={input}
          onChangeText={filterCoins}
          placeholder='Search...'
          placeholderTextColor='#fff'
          style={styles.input}
          keyboardAppearance='dark'
          clearButtonMode='always'
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CoinSearch;

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 30,
  },

  input: {
    borderColor: '#BFD7ED',
    borderWidth: 2,
    fontWeight: 'bold',
    letterSpacing: 1,

    color: '#fff',
    padding: 15,
    borderRadius: 30,
    paddingLeft: 20,
    width: '70%',
  },
});
