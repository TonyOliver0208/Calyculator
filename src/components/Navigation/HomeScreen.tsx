import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import MyKeyboard from '../MyKeyboard';
import {useNavigation} from '@react-navigation/native';

//@ts-ignore
const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MyKeyboard navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
