import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyKeyboard from './src/components/MyKeyboard';
import CurrencyConverter from './src/components/Navigation/CurrencyConverter';
import DateCalculator from './src/components/Navigation/DateCalculator';
import ThemeToggleButton from './src/components/Navigation/ThemeToggleButton';
import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';

const Tab = createMaterialTopTabNavigator();

function AppContent(): React.JSX.Element {
  const {colors} = React.useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.navbar}>
        <ThemeToggleButton />
      </View>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: colors.background},
            tabBarLabelStyle: {color: colors.text},
            tabBarIndicatorStyle: {backgroundColor: colors.primary},
          }}>
          <Tab.Screen name="Calculator" component={MyKeyboard} />
          <Tab.Screen name="Currency" component={CurrencyConverter} />
          <Tab.Screen name="Date" component={DateCalculator} />
        </Tab.Navigator>
      </NavigationContainer>
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
    paddingBottom: 5,
  },
});

export default App;
