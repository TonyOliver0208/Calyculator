import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const CountDaysComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dayCount, setDayCount] = useState<number | null>(null);

  // Function to calculate the number of days between two dates
  const countDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = Math.abs(end.getTime() - start.getTime());
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  };

  const handleCalculate = () => {
    if (startDate && endDate) {
      const days = countDays(startDate, endDate);
      setDayCount(days);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Days Between Two Dates</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter start date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter end date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Button title="Calculate Days" onPress={handleCalculate} />

      {dayCount !== null && (
        <Text style={styles.result}>Days between: {dayCount} days</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CountDaysComponent;
