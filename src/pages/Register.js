import React from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Card,
  Divider,
  Stack,
  TextInput,
  Title,
  Anchor,
} from "@mantine/core";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import cryptojs from "crypto-js";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
function Register() {
  const dispatch = useDispatch();
  const registerform = useForm({
    intialValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // console.log(registerform.values);
  const onSubmit = async (event) => {
    // console.log(values);
    event.preventDefault();
    // console.log(registerform.values);
    try {
      //Checking if user already exist bsed on email
      dispatch(ShowLoading());
      const qry = query(
        collection(fireDb, "users"),
        where("email", "==", registerform.values.email)
      );
      const existingUsers = await getDocs(qry);
      if (existingUsers.size > 0) {
        // alert("User already exist");
        showNotification({
          title: "User already exist",
          color: "red",
        });
        return;
      } else {
        //encrypt password
        const encryptPassword = cryptojs.AES.encrypt(
          registerform.values.password,
          "expense_tracker"
        ).toString();
        const response = await addDoc(collection(fireDb, "users"), {
          ...registerform.values,
          password: encryptPassword,
        });
        if (response.id) {
          // alert("User created successfully");
          showNotification({
            title: "User created successfully",
            color: "green",
          });
        } else {
          // alert("User creation failed");
          showNotification({
            title: "User creation failed",
            color: "red",
          });
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      // console.log(error);
      // alert("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
      showNotification({
        title: "Something went wrong",
        color: "red",
      });
    }
  };
  return (
    <div className="flex h-screen justify-center items-center auth">
      <Card sx={{ width: 400, padding: "sm" }} shadow="lg" withBorder>
        <Title order={2} mb={5} color="grey">
          EXPENSE TRACKER REGISTER
        </Title>
        <Divider variant="solid" color="grey" />
        <form action="" onSubmit={onSubmit}>
          <Stack mt={5}>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              name="name"
              {...registerform.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              {...registerform.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              {...registerform.getInputProps("password")}
            />
            <Button type="submit" color="teal">
              Register
            </Button>
            <Anchor href="/login" color="teal">
              Already have an account? Login
            </Anchor>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default Register;
