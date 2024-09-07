import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {Styles} from '../../styles/GlobalStyles';
import {myColors} from '../../styles/Colors';

export default function ThemeToggleButton() {
  const {theme, setTheme} = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <TouchableOpacity
      style={[
        Styles.themeToggleButton,
        {
          backgroundColor:
            theme === 'light'
              ? myColors.dark.background
              : myColors.light.background,
        },
      ]}
      onPress={toggleTheme}>
      <Text
        style={[
          Styles.themeToggleButtonText,
          {color: theme === 'light' ? myColors.light.text : myColors.dark.text},
        ]}>
        {theme === 'light' ? '🌙' : '☀️'}
      </Text>
    </TouchableOpacity>
  );
}
