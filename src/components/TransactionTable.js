import { Group, Table } from "@mantine/core";
import { deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { fireDb } from "../firebaseConfig";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";

function TransactionTable({
  transactions,
  setSelectedTransaction,
  setFormMode,
  setShowForm,
  getData,
}) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const deleTransaction = async (id) => {
    try {
      dispatch(ShowLoading());
      await deleteDoc(doc(fireDb, `users/${user.id}/transactions`, id));

      // await setDoc(
      //   doc(fireDb, `users/${user.id}/transactions`, transactionData.id),
      //   transactionForm.values
      // );

      dispatch(HideLoading());
      showNotification({
        title: "Transaction Deleted",
        color: "green",
      });
      getData();
    } catch (error) {
      dispatch(HideLoading());
      console.log(error);
      showNotification({
        title: "Error deleting transaction",
        color: "red",
      });
    }
  };
  const getRows = transactions.map((transaction) => (
    <tr key={transaction.name}>
      <td>{transaction.name}</td>
      <td>{transaction.type.toUpperCase()}</td>
      <td>{transaction.amount}</td>
      <td>{moment(transaction.date).format("DD-MM-YYYY")}</td>
      <td>{transaction.category}</td>
      <td>{transaction.reference}</td>
      <td>
        <Group>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedTransaction(transaction);
              setFormMode("edit");
              setShowForm(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleTransaction(transaction.id);
            }}
          ></i>
        </Group>
      </td>
    </tr>
  ));
  return (
    <Table verticalSpacing="md" fontSize="sm" striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>Reference</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{getRows}</tbody>
    </Table>
  );
}

export default TransactionTable;
