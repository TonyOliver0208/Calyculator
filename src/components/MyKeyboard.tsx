import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Styles} from '../styles/GlobalStyles';
import {ThemeContext} from '../context/ThemeContext';
import Button from './Button';

export default function MyKeyboard() {
  const {colors} = useContext(ThemeContext);
  const [value, setValue] = useState('0');
  const [bracketOpen, setBracketOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  const [isResult, setIsResult] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to the end whenever the value changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [value]);

  //@ts-ignore
  const handlePress = val => {
    if (val === 'AC') {
      setValue('0');
      setBracketOpen(false);
      setLastOperation(null);
      setIsResult(false);
    } else if (val === '=') {
      if (isResult) {
        return;
      }
      try {
        if (
          (value.match(/\(/g) || []).length ===
          (value.match(/\)/g) || []).length
        ) {
          let result;
          const lastChar = value.slice(-1);

          if (lastChar === '/' && value.split('/').pop() === '0') {
            setValue("Can't divide by zero");
            return;
          }

          if (
            lastChar === '+' ||
            lastChar === '-' ||
            lastChar === '*' ||
            lastChar === '/'
          ) {
            result = eval(value.replace('()', '(0)').slice(0, -1));
          } else {
            result = eval(value.replace('()', '(0)') + '*1');
          }

          // Check for Infinity
          if (!isFinite(result)) {
            setValue("Can't divide by zero");
            setHistory(prevHistory => [
              ...prevHistory,
              `${value} \n= Can't divide by zero`,
            ]);
          } else {
            setHistory(prevHistory => [
              ...prevHistory,
              `${value} \n= ${result}`,
            ]);
            setValue(result.toString());
            setIsResult(true); // Set the result flag
            setLastOperation('=');
          }
        }
      } catch (e) {
        setValue('Format Error');
      }
    } else if (val === 'back') {
      setValue(value.slice(0, -1) || '0');
      setLastOperation(null);
      setIsResult(false); // Reset result state
    } else if (val === '()') {
      if (value === '0') {
        setValue('(');
        setBracketOpen(true);
      } else if (
        value.slice(-1) === '+' ||
        value.slice(-1) === '-' ||
        value.slice(-1) === '*' ||
        value.slice(-1) === '/'
      ) {
        setValue(value + '(');
        setBracketOpen(true);
      } else {
        if (bracketOpen) {
          setValue(value + ')');
          setBracketOpen(false);
        } else {
          setValue(value + '(');
          setBracketOpen(true);
        }
      }
      setLastOperation(null);
      setIsResult(false); // Reset result state
    } else {
      if (
        isResult ||
        value === 'Format Error' ||
        value === "Can't divide by zero"
      ) {
        // If current value is a result, clear it before starting a new calculation
        if (
          val !== '+' &&
          val !== '-' &&
          val !== '*' &&
          val !== '/' &&
          val !== '%' &&
          val !== '.'
        ) {
          setValue(val); // Start new calculation
        } else {
          setValue(value + val); // Continue using the result for a new operation
        }
        setIsResult(false); // Reset result state
      } else {
        if (value === '0') {
          if (
            val === '+' ||
            val === '-' ||
            val === '*' ||
            val === '/' ||
            val === '.' ||
            val === '%'
          ) {
            setValue(value + val);
          } else {
            setValue(val);
          }
        } else if (isNaN(val)) {
          if (
            value.slice(-1) === '+' ||
            value.slice(-1) === '-' ||
            value.slice(-1) === '*' ||
            value.slice(-1) === '/' ||
            value.slice(-1) === '.' ||
            value.slice(-1) === '%'
          ) {
            setValue(value.slice(0, -1) + val);
          } else {
            setValue(value + val);
          }
        } else {
          setValue(value + val);
        }
      }
      setLastOperation(null);
    }
  };

  const renderHistoryItem = ({item}: {item: string}) => (
    <Text style={[styles.historyText]}>
      {item.replace(/\*/g, '×').replace(/\//g, '÷')}
    </Text>
  );

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }
  }, [history]);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={Styles.calculationDisplay}>
        <FlatList
          ref={flatListRef}
          data={[...history].reverse()}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.historyScroll}
          keyboardShouldPersistTaps="handled"
          inverted={true} // Invert the list to show the newest items at the bottom
        />
        <View style={styles.currentCalculationContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.currentCalculationScroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}>
            <Text
              style={[
                styles.currentCalculationText,
                {
                  color: colors.text,
                  fontSize: 40,
                  textAlign: 'right',
                  padding: 5,
                },
              ]}>
              {value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                .replace(/\*/g, '×')
                .replace(/\//g, '÷')}
            </Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={[Styles.keyboardContainer, styles.keyboardBackground]}>
        <View style={Styles.row}>
          <Button title="C" isOrange onPress={() => handlePress('AC')} />
          <Button title="⌫" isOrange onPress={() => handlePress('back')} />

          <Button title="%" isOrange onPress={() => handlePress('%')} />
          <Button title="÷" isOrange onPress={() => handlePress('/')} />
        </View>
        <View style={Styles.row}>
          <Button title="7" onPress={() => handlePress('7')} />
          <Button title="8" onPress={() => handlePress('8')} />
          <Button title="9" onPress={() => handlePress('9')} />
          <Button title="×" isOrange onPress={() => handlePress('*')} />
        </View>
        <View style={Styles.row}>
          <Button title="4" onPress={() => handlePress('4')} />
          <Button title="5" onPress={() => handlePress('5')} />
          <Button title="6" onPress={() => handlePress('6')} />
          <Button title="−" isOrange onPress={() => handlePress('-')} />
        </View>
        <View style={Styles.row}>
          <Button title="1" onPress={() => handlePress('1')} />
          <Button title="2" onPress={() => handlePress('2')} />
          <Button title="3" onPress={() => handlePress('3')} />
          <Button title="+" isOrange onPress={() => handlePress('+')} />
        </View>
        <View style={Styles.row}>
          <Button title="()" isOrange onPress={() => handlePress('()')} />
          <Button title="0" onPress={() => handlePress('0')} />
          <Button title="." onPress={() => handlePress('.')} />

          <TouchableOpacity
            style={[styles.equalButton, {backgroundColor: '#FF9F0A'}]}
            onPress={() => handlePress('=')}
            activeOpacity={0.7}>
            <Text style={styles.text}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    opacity: 0.2,
    marginVertical: 5,
  },
  keyboardBackground: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  equalButton: {
    backgroundColor: '#FF9F0A',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    minHeight: 80,
    borderRadius: 40,
  },
  historyScroll: {
    flex: 1,
  },
  historyContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  historyText: {
    fontSize: 22,
    color: '#c4c4c4',
    marginBottom: 10,
    textAlign: 'right',
    width: '100%',
  },
  currentCalculationScroll: {
    maxHeight: 60,
  },
  currentCalculationContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 60,
  },
  currentCalculationText: {
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'right',
    padding: 10,
  },
});
