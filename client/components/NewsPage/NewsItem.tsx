import React from 'react';
const moment = require('moment');
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { CoinNews } from '../../types/CoinNews';

type NewsItemProps = {
  data: CoinNews;
};
const NewsItem = ({ data }: NewsItemProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newsArticle}>
        <Text style={styles.text}>{data.title}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(`${data.news_url}`)}>
          <View style={styles.imgArea}>
            <Image
              source={{ uri: data.image_url }}
              style={styles.image}
              accessibilityLabel='Story Image'
            />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.source}>Source: {data.source_name}</Text>
        </View>
        <View>
          <Text style={styles.date}>
            {moment(data.date).format('MMMM Do YYYY')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {},

  text: {
    color: '#fff',
    margin: 10,
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: 'Chivo_400Regular',
  },

  source: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: 'Chivo_400Regular',
  },

  newsArticle: {
    marginHorizontal: 20,
    paddingVertical: 20,
    width: '90%',
    borderBottomColor: '#BFD7ED',
    borderBottomWidth: 2,
  },

  date: {
    color: '#fff',
    margin: 10,
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: 'Chivo_400Regular',
  },
  imgArea: {
    margin: 10,
  },

  image: { width: 250, height: 110, borderRadius: 20 },
});
