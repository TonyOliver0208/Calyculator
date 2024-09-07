import React, {useContext} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import MyKeyboard from './src/components/MyKeyboard';
import ThemeToggleButton from './src/components/Navigation/ThemeToggleButton';
import {ThemeContext, ThemeProvider} from './src/context/ThemeContext';

function AppContent(): React.JSX.Element {
  const {colors} = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.navbar}>
        <ThemeToggleButton />
      </View>
      <View style={styles.keyboardContainer}>
        <MyKeyboard />
      </View>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  keyboardContainer: {
    flex: 1, // Allow MyKeyboard to take available space
    justifyContent: 'flex-start', // Align items to the top
  },
});

export default App;
