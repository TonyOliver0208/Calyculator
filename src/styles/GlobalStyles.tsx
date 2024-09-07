import {StyleSheet} from 'react-native';
import {myColors} from './Colors';

export const Styles = StyleSheet.create({
  // Button
  btn: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  btnOrange: {
    backgroundColor: myColors.orange,
  },
  btnGray: {
    backgroundColor: myColors.btnGray,
  },
  btnLight: {
    backgroundColor: myColors.white,
  },
  btnDark: {
    backgroundColor: myColors.btnDark,
  },
  btnText: {
    fontSize: 30,
    fontWeight: '500',
  },
  btnTextLight: {
    color: myColors.white,
  },
  btnTextDark: {
    color: myColors.black,
  },
  // Keyboard
  keyboardContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  viewBottom: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
  },
  calculationDisplay: {
    height: 220,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  screenFirstNumber: {
    fontSize: 66,
    color: myColors.gray,
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
  screenSecondNumber: {
    fontSize: 30,
    color: myColors.gray,
    fontWeight: '200',
    alignSelf: 'flex-end',
  },
  operationText: {
    color: myColors.orange,
    fontSize: 30,
    fontWeight: '500',
  },
  themeToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggleButtonText: {
    fontSize: 20,
  },
});
