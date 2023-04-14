import { Button, Group, Select, TextInput, Stack } from "@mantine/core";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { fireDb } from "../firebaseConfig";
import moment from "moment";
function TransactionForm({
  formMode,
  setFormMode,
  setShowForm,
  transactionData,
  getData,
}) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const transactionForm = useForm({
    initialValues: {
      name: "",
      type: "",
      amount: "",
      date: "",
      category: "",
      reference: "",
    },
  });
  // console.log(transactionForm.values);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(ShowLoading());

      if (formMode === "add") {
        await addDoc(
          collection(fireDb, `users/${user.id}/transactions`),
          transactionForm.values
        );
      } else {
        await setDoc(
          doc(fireDb, `users/${user.id}/transactions`, transactionData.id),
          transactionForm.values
        );
      }

      showNotification({
        title: formMode === "add" ? "Transaction added" : "Transaction updated",
        color: "green",
      });
      dispatch(HideLoading());
      getData();
      setShowForm(false);
    } catch (error) {
      console.log(setShowForm);
      console.log(error);
      dispatch(HideLoading());
      showNotification({
        title:
          formMode === "add"
            ? "Error adding transaction"
            : "Error updating transaction",
        color: "red",
      });
    }
  };
  useEffect(() => {
    if (formMode === "edit") {
      transactionForm.setValues(transactionData);
      transactionForm.setFieldValue(
        "date",
        moment(transactionData.date, "YYYY-MM-DD").format("YYYY-MM-DD")
      );
    }
  }, [transactionData]);
  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <Stack>
          <TextInput
            name="name"
            label="Name"
            placeholder="Enter Transaction Name"
            {...transactionForm.getInputProps("name")}
          />
          {/* /*{" "}
          <TextInput
            name="name"
            label="Name"
            placeholder="Enter Transaction Name"
            {...transactionForm.getInputProps("name")}
          />{" "}
          */}
          <Group position="apart" grow>
            <Select
              // width
              // className="w-50"
              name="type"
              label="Type"
              placeholder="Select Transaction Type"
              data={[
                { value: "income", label: "Income" },
                { value: "expense", label: "Expense" },
              ]}
              {...transactionForm.getInputProps("type")}
            />
            <Select
              // className="w-100"
              name="category"
              label="Category"
              placeholder="Select Transaction Category"
              data={[
                { value: "food", label: "Food" },
                { value: "transport", label: "Transport" },
                { value: "shopping", label: "Shopping" },
                { value: "entertainment", label: "Entertainment" },
                { value: "health", label: "Health" },
                { value: "education", label: "Education" },
                { value: "salary", label: "Salary" },
                { value: "freelance", label: "Freelance" },
                { value: "business", label: "Business" },
              ]}
              {...transactionForm.getInputProps("category")}
            />
          </Group>
          <Group position="apart" grow>
            <TextInput
              // width="40%"
              name="amount"
              label="Amount"
              placeholder="Enter Transaction Amount"
              {...transactionForm.getInputProps("amount")}
            />
            <TextInput
              // width="60%"

              name="date"
              label="Date"
              type="date"
              placeholder="Enter Transaction Date"
              {...transactionForm.getInputProps("date")}
            />
          </Group>
          <TextInput
            name="reference"
            label="Reference"
            placeholder="Enter Transaction Reference"
            {...transactionForm.getInputProps("reference")}
          />
          <Button type="submit">
            {formMode === "add" ? "ADD" : "Update Transaction"}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default TransactionForm;
