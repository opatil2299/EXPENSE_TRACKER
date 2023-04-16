import React from "react";
import "../stylesheets/analytics.css";
import { Divider, Group } from "@mantine/core";
import { RingProgress, Text } from "@mantine/core";
import { Progress } from "@mantine/core";
function Analytics({ transactions }) {
  const totalTransactions = transactions.length;

  //transactions count
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  ).length;
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  ).length;
  var totalIncomeTransactionsPercentage =
    (totalIncomeTransactions / totalTransactions) * 100;
  if (isNaN(totalIncomeTransactionsPercentage))
    totalIncomeTransactionsPercentage = 0;
  var totalExpenseTransactionsPercentage =
    (totalExpenseTransactions / totalTransactions) * 100;
  if (isNaN(totalExpenseTransactionsPercentage))
    totalExpenseTransactionsPercentage = 0;
  //total ampount
  const totalAmount = transactions.reduce((acc, transaction) => {
    return acc + Number(transaction.amount);
  }, 0);
  const totalIncomeAmount = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);
  const totalExpenseAmount = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);
  var totalIncomeAmountPercentage = (totalIncomeAmount / totalAmount) * 100;
  if (isNaN(totalIncomeAmountPercentage)) totalIncomeAmountPercentage = 0;
  var totalExpenseAmountPercentage = (totalExpenseAmount / totalAmount) * 100;
  if (isNaN(totalExpenseAmountPercentage)) totalExpenseAmountPercentage = 0;
  const categories = [
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
    { value: "shopping", label: "Shopping" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "salary", label: "Salary" },
    { value: "freelance", label: "Freelance" },
    { value: "business", label: "Business" },
  ];

  return (
    <div>
      <Group mt={20}>
        <div className="total-transactions">
          <h1 className="card-title">Total Transactions:{totalTransactions}</h1>
          <Divider my={20} />
          <p>Income Transactions : {totalIncomeTransactions}</p>
          <p>Expense Transactions : {totalExpenseTransactions}</p>
          <Group>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  {/* Application data usage */}
                  Income {totalIncomeTransactionsPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: totalIncomeTransactionsPercentage, color: "teal" },
                {
                  value: 100 - totalIncomeTransactionsPercentage,
                  // color: "grey",
                },
              ]}
              // size={150}
            />
            <RingProgress
              label={
                <Text size="xs" align="center">
                  {/* Application data usage */}
                  Expense {totalExpenseTransactionsPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: totalExpenseTransactionsPercentage, color: "red" },
                {
                  value: 100 - totalExpenseTransactionsPercentage,
                  // color: "grey",
                },
              ]}
            />
          </Group>
        </div>
        <div className="total-turnover">
          <h1 className="card-title">Total Turnover:{totalAmount}</h1>
          <Divider my={20} />
          <p>Income : {totalIncomeAmount}</p>
          <p>Expense : {totalExpenseAmount}</p>{" "}
          <Group>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  {/* Application data usage */}
                  Income {totalIncomeAmountPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: totalIncomeAmountPercentage, color: "teal" },
                {
                  value: 100 - totalIncomeAmountPercentage,
                  // color: "grey",
                },
              ]}
              // size={150}
            />
            <RingProgress
              label={
                <Text size="xs" align="center">
                  {/* Application data usage */}
                  Expense {totalExpenseAmountPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: totalExpenseAmountPercentage, color: "red" },
                {
                  value: 100 - totalExpenseAmountPercentage,
                  // color: "grey",
                },
              ]}
            />
          </Group>
        </div>
      </Group>
      <Group mt={20} grow>
        <div className="income-categories">
          <h1 className="card-title">Income Categories</h1>
          <Divider my={20} />
          {categories.map((category) => {
            const incomeCategorytransactionsAmount = transactions
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category.value
              )
              .reduce((acc, transaction) => {
                return acc + Number(transaction.amount);
              }, 0);
            var incomeCategorytransactionsPercentage =
              (incomeCategorytransactionsAmount / totalIncomeAmount) * 100;
            if (isNaN(incomeCategorytransactionsPercentage))
              incomeCategorytransactionsPercentage = 0;
            return (
              <div>
                <p>{category.label}</p>
                <Progress
                  size={25}
                  color="teal"
                  value={incomeCategorytransactionsPercentage}
                  label={incomeCategorytransactionsPercentage.toFixed(2) + "%"}
                />
              </div>
            );
          })}
        </div>
        <div className="expense-categories">
          <h1 className="card-title">Expense Categories</h1>
          <Divider my={20} />
          {categories.map((category) => {
            const expenseCategorytransactionsAmount = transactions
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category.value
              )
              .reduce((acc, transaction) => {
                return acc + Number(transaction.amount);
              }, 0);
            var expenseCategorytransactionsPercentage =
              (expenseCategorytransactionsAmount / totalExpenseAmount) * 100;
            if (isNaN(expenseCategorytransactionsPercentage))
              expenseCategorytransactionsPercentage = 0;
            return (
              <div>
                <p>{category.label}</p>
                <Progress
                  size={25}
                  color="red"
                  value={expenseCategorytransactionsPercentage}
                  label={expenseCategorytransactionsPercentage.toFixed(2) + "%"}
                />
              </div>
            );
          })}
        </div>
      </Group>
    </div>
  );
}

export default Analytics;
