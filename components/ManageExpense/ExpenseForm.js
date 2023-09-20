import { Alert, StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import { useState } from 'react'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues
      ? defaultValues.amount.toString()
      : '',
    date: defaultValues
      ? getFormattedDate(defaultValues.date)
      : '',
    description: defaultValues
      ? defaultValues.description
      : '',
  })

  const inputChangeChangeHandler = (
    inputIdentifier,
    enteredAmount,
  ) => {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredAmount,
      }
    })
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    }

    const amountIsValid =
      !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid =
      expenseData.date.toString() !== 'Invalid date'
    const descriptionIsValid =
      expenseData.description.trim().length > 0

    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid
    ) {
      Alert.alert(
        'Invalid input',
        'Please check your input values',
      )
      return
    }

    onSubmit(expenseData)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeChangeHandler.bind(
              this,
              'amount',
            ),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeChangeHandler.bind(
              this,
              'date',
            ),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          autoCapitalize: 'sentences',
          onChangeText: inputChangeChangeHandler.bind(
            this,
            'description',
          ),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode='flat'
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={submitHandler}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})
