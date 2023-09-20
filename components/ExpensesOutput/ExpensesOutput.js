import { StyleSheet, Text, View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}) {
  let content = (
    <Text style={styles.infoText}>{fallbackText}</Text>
  )
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={expenses}
        periodName={expensesPeriod}
      />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 32,
  },
})
