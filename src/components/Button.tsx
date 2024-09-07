import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Styles} from '../styles/GlobalStyles';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

interface ButtonProps {
  onPress: () => void;
  title: string;
  isOrange?: boolean;
  isGray?: boolean;
}

export default function Button({
  title,
  onPress,
  isOrange,
  isGray,
}: ButtonProps) {
  const {colors} = useContext(ThemeContext);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: 'transparent',
          opacity: isPressed ? 0.8 : 1,
        },
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.text,
          {
            color: isOrange
              ? colors.orange
              : isGray
              ? colors.gray
              : colors.text,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    minHeight: 80,
    borderRadius: 40,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
  },
  equalButton: {
    backgroundColor: '#FF9F0A', // Orange color for the '=' button
  },
});
