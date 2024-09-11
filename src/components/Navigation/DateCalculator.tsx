import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ThemeContext} from '../../context/ThemeContext';

export default function DateDifferenceCalculator() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const {colors} = useContext(ThemeContext);

  const calculateDifference = () => {
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    return {years, months, days};
  };

  const {years, months, days} = calculateDifference();

  const DateInput = ({label, date, onPress}) => (
    <View style={styles.dateInputContainer}>
      <Text style={[styles.dateLabel, {color: colors.text}]}>{label}</Text>
      <TouchableOpacity
        style={[styles.dateTouchable, {backgroundColor: colors.button}]}
        onPress={onPress}>
        <Text style={[styles.dateText, {color: colors.buttonText}]}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* <View style={styles.header}>
        <Text style={[styles.title, {color: colors.text}]}>
          Date Difference
        </Text>
      </View> */}

      <DateInput
        label="From:"
        date={fromDate}
        onPress={() => setShowFromPicker(true)}
      />
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date);
          }}
        />
      )}

      <DateInput
        label="To:"
        date={toDate}
        onPress={() => setShowToPicker(true)}
      />
      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowToPicker(false);
            if (date) setToDate(date);
          }}
        />
      )}

      <View style={[styles.differenceContainer, {borderColor: colors.gray}]}>
        <Text
          style={[
            styles.differenceTitle,
            {
              color: colors.orange,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray,
            },
          ]}>
          Difference
        </Text>
        <View style={styles.differenceRow}>
          <View style={styles.differenceColumn}>
            <Text style={[styles.differenceValue, {color: colors.text}]}>
              {years}
            </Text>
            <Text style={[styles.differenceLabel, {color: colors.text}]}>
              Years
            </Text>
          </View>
          <View style={styles.differenceColumn}>
            <Text style={[styles.differenceValue, {color: colors.text}]}>
              {months}
            </Text>
            <Text style={[styles.differenceLabel, {color: colors.text}]}>
              Months
            </Text>
          </View>
          <View style={styles.differenceColumn}>
            <Text style={[styles.differenceValue, {color: colors.text}]}>
              {days}
            </Text>
            <Text style={[styles.differenceLabel, {color: colors.text}]}>
              Days
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.shareButton, {backgroundColor: colors.orange}]}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  dateTouchable: {
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
  },
  differenceContainer: {
    marginTop: 30,
    // padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  differenceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    padding: 20,
    textAlign: 'center',
  },
  differenceText: {
    fontSize: 18,
    marginVertical: 5,
  },
  shareButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  differenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingBottom: 20,
  },
  differenceColumn: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  differenceValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  differenceLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
