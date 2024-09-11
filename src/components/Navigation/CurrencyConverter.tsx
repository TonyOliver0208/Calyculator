import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {Picker} from '@react-native-picker/picker';
import Button from '../Button';
import {CURRENCY} from '../../constants/Currency';

import {API_BASE_URL, API_KEY} from '../../constants/Exchange';

export default function CurrencyConverter() {
  const {colors} = useContext(ThemeContext);
  const [amounts, setAmounts] = useState({1: '0', 2: '0', 3: '0'});
  const [activeInputId, setActiveInputId] = useState('1');
  const [rates, setRates] = useState(null);
  const [fetching, setFetching] = useState(false);

  const [currencyInputs, setCurrencyInputs] = useState([
    {id: '1', currency: 'JPY'},
    {id: '2', currency: 'USD'},
    {id: '3', currency: 'EUR'},
  ]);

  const fetchExchangeRates = useCallback(async () => {
    setFetching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${API_KEY}/latest/USD`);
      const data = await response.json();
      if (data.result === 'success') {
        setRates(data.conversion_rates);
      } else {
        throw new Error('Failed to fetch exchange rates');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  const convertCurrency = useCallback(
    (fromId, amount, currentInputs = currencyInputs) => {
      if (!rates) return;

      const fromCurrency = currentInputs.find(
        input => input.id === fromId,
      ).currency;
      const fromRate = rates[fromCurrency];

      const newAmounts = {};
      currentInputs.forEach(({id, currency}) => {
        if (id !== fromId) {
          const toRate = rates[currency];
          const convertedAmount = (parseFloat(amount) / fromRate) * toRate;
          newAmounts[id] = convertedAmount.toFixed(2);
        } else {
          newAmounts[id] = amount;
        }
      });

      setAmounts(newAmounts);
    },
    [rates, currencyInputs],
  );

  const handleInputChange = useCallback(
    (value, id) => {
      setActiveInputId(id);
      setAmounts(prevAmounts => {
        const newAmounts = {...prevAmounts, [id]: value};
        convertCurrency(id, value);
        return newAmounts;
      });
    },
    [convertCurrency],
  );

  const handleCurrencyChange = useCallback(
    (value, id) => {
      setCurrencyInputs(prevInputs => {
        const newInputs = prevInputs.map(input =>
          input.id === id ? {...input, currency: value} : input,
        );

        // Trigger conversion immediately with the new currency
        setAmounts(prevAmounts => {
          const newAmounts = {...prevAmounts};
          convertCurrency(activeInputId, prevAmounts[activeInputId], newInputs);
          return newAmounts;
        });

        return newInputs;
      });
    },
    [activeInputId, convertCurrency],
  );

  useEffect(() => {
    if (rates) {
      convertCurrency(activeInputId, amounts[activeInputId], currencyInputs);
    }
  }, [
    activeInputId,
    amounts[activeInputId],
    rates,
    convertCurrency,
    currencyInputs,
  ]);

  const handlePress = useCallback(
    key => {
      setAmounts(prevAmounts => {
        let newAmount = prevAmounts[activeInputId];

        if (key === 'AC' || (key === 'back' && newAmount.length === 1)) {
          newAmount = '0';
        } else if (key === 'back') {
          newAmount = newAmount.slice(0, -1) || '0';
        } else if (key === '.') {
          if (!newAmount.includes('.')) {
            newAmount += key;
          }
        } else {
          if (newAmount.length < 10) {
            newAmount = newAmount === '0' ? key : newAmount + key;
          }
        }

        // Only update the amount for the active input
        return {...prevAmounts, [activeInputId]: newAmount};
      });
    },
    [activeInputId],
  );

  const handleInputPress = useCallback(
    id => {
      setActiveInputId(id);
      setAmounts(prevAmounts => {
        const newAmounts = {...prevAmounts, [id]: '1'};
        convertCurrency(id, '1', currencyInputs);
        return newAmounts;
      });
    },
    [convertCurrency, currencyInputs],
  );

  const renderCurrencyInput = ({id, currency}) => {
    const selectedCurrency = CURRENCY.find(item => item.value === currency);
    return (
      <View style={styles.currencyInputWrapper} key={id}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => handleInputPress(id)}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currency}
              style={[styles.picker, {color: colors.text}]}
              dropdownIconColor={colors.text}
              onValueChange={itemValue => handleCurrencyChange(itemValue, id)}>
              {CURRENCY.map(item => (
                <Picker.Item
                  key={item.value}
                  label={`${item.label} - ${item.name}`}
                  value={item.value}
                  color={colors.text}
                />
              ))}
            </Picker>
          </View>
          <Text
            style={[
              styles.amountText,
              {color: activeInputId === id ? '#FF5722' : colors.text},
            ]}>
            {parseFloat(amounts[id]).toFixed(2).replace(/\.00$/, '')}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.currencyName, {color: colors.text}]}>
          {selectedCurrency.name}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}>
      {currencyInputs.map(renderCurrencyInput)}
      <Text style={{color: colors.text, marginTop: 15}}>
        Exchange rates are provided by ExchangeRate-API
        {fetching && <Text> Updating...</Text>}
      </Text>
      <View style={styles.divider} />
      <View style={styles.keypad}>
        <View style={styles.row}>
          <Button title="7" onPress={() => handlePress('7')} />
          <Button title="8" onPress={() => handlePress('8')} />
          <Button title="9" onPress={() => handlePress('9')} />
          <Button title="AC" isOrange onPress={() => handlePress('AC')} />
        </View>
        <View style={styles.row}>
          <Button title="4" onPress={() => handlePress('4')} />
          <Button title="5" onPress={() => handlePress('5')} />
          <Button title="6" onPress={() => handlePress('6')} />
          <Button title="⌫" isOrange onPress={() => handlePress('back')} />
        </View>
        <View style={styles.row}>
          <Button title="1" onPress={() => handlePress('1')} />
          <Button title="2" onPress={() => handlePress('2')} />
          <Button title="3" onPress={() => handlePress('3')} />
          <Button title="" disabled />
        </View>
        <View style={styles.row}>
          <Button title="" disabled />
          <Button title="0" onPress={() => handlePress('0')} />
          <Button title="." isOrange onPress={() => handlePress('.')} />
          <Button title="" disabled />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  currencyInputWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',

    // borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    // paddingBottom: 5,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    height: 50,
  },
  amountText: {
    fontSize: 32,
    marginLeft: 10,
    flex: 2,
    textAlign: 'right',
  },
  currencyName: {
    marginTop: -8,
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 10,
  },
  keypad: {
    marginTop: 5,
    width: '100%',
    maxWidth: 350,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  zeroButton: {
    flex: 2,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginRight: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
    marginVertical: 10,
  },
});
