import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';

import DateTimePicker, {
  Event,
  AndroidEvent,
} from '@react-native-community/datetimepicker';
import { saveCoinData } from '../../../redux/CoinInputData';
import { useDispatch } from 'react-redux';
import Services from '../../../services/userCoinApi';

import TabIcon2 from '../../TabIcons/TabIcon2';
import Icons from '../../../constants/Icons';

const UserInput = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [boughtPrice, setBoughtPrice] = useState(0);
  const [userAmount, setUserAmount] = useState(0);
  const [userCoin, setUserCoin] = useState('');
  const [show, setshow] = useState(false);
  const [selectDate, setselectDate] = useState(true);

  const onChange = (
    _event: Event | AndroidEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const addCoinData = async () => {
    dispatch(
      saveCoinData({
        userAmount: userAmount,
        userCoin: userCoin,
        coinPrice: boughtPrice,
        date: date,
      })
    );
    await Services.addData({ date, boughtPrice, userAmount, userCoin });

    setUserAmount(0);
    setUserCoin('');
    setDate(new Date());
    setBoughtPrice(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setselectDate(true);
          Keyboard.dismiss;
        }}
      >
        <View style={styles.row}>
          <TextInput
            placeholder='Input a coin...'
            placeholderTextColor='#fff'
            value={userCoin}
            style={styles.selector}
            onChangeText={(val) => setUserCoin(val)}
            keyboardAppearance='dark'
          />
          {selectDate && (
            <View style={styles.dateArea}>
              <TouchableOpacity
                onPress={() => {
                  setshow(!show);
                  setselectDate(!selectDate);
                }}
              >
                <Text style={styles.DateInput}>Open date...</Text>
              </TouchableOpacity>
            </View>
          )}

          <View>
            {show && (
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                is24Hour={true}
                mode='date'
                display='default'
                onChange={onChange}
                style={styles.datepicker}
                textColor='red'
              />
            )}
          </View>

          <TextInput
            placeholder='Open price...'
            placeholderTextColor='#fff'
            value={String(boughtPrice)}
            style={styles.input}
            onChangeText={(val) => setBoughtPrice(Number(val))}
            keyboardAppearance='dark'
            keyboardType={'numeric'}
          />
          <TextInput
            placeholder='Amount...'
            placeholderTextColor='#fff'
            value={String(userAmount)}
            style={styles.input}
            onChangeText={(val) => setUserAmount(Number(val))}
            keyboardAppearance='dark'
            keyboardType={'numeric'}
          />
          <View style={styles.btnArea}>
            <TouchableOpacity onPress={addCoinData} style={styles.button}>
              <TabIcon2 icon={Icons.add} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  dateArea: {
    borderBottomWidth: 3,
    borderBottomColor: '#CCE6FF',
    marginBottom: 15,
    marginLeft: 20,
    width: 160,
  },
  selector: {
    width: 160,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 12,
    borderBottomColor: '#CCE6FF',
    borderBottomWidth: 3,
    color: '#cdebf9',
    fontFamily: 'Chivo_400Regular',
    paddingRight: 30,
    marginVertical: 15,
  },

  btnArea: {
    justifyContent: 'center',
    alignContent: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 5,
    width: 100,
    elevation: 3,
    padding: 0,
  },

  btntext: {
    fontSize: 16,
    fontFamily: 'Chivo_400Regular',
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#cdebf9',
  },
  row: {
    width: 400,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  datepicker: {
    borderBottomWidth: 3,
    borderBottomColor: '#CCE6FF',
    marginVertical: 15,
    borderRadius: 15,

    color: 'pink',
    backgroundColor: 'grey',
    overflow: 'hidden',
    width: 150,
    marginLeft: 20,
    height: 50,
  },

  text: {
    textAlign: 'center',
    letterSpacing: 1,
    paddingTop: 5,
    color: '#cdebf9',
    fontFamily: 'Chivo_400Regular',
  },

  input: {
    width: 165,

    height: 50,
    fontFamily: 'Chivo_400Regular',
    fontSize: 20,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderBottomColor: '#CCE6FF',
    color: '#cdebf9',
    paddingRight: 30,
    marginVertical: 15,
    marginHorizontal: 10,
  },

  DateInput: {
    width: 170,
    height: 50,
    fontFamily: 'Chivo_400Regular',
    fontSize: 20,
    paddingHorizontal: 12,
    paddingTop: 25,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    color: '#cdebf9',
    marginHorizontal: 10,
  },
});
