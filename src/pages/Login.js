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
  Box,
} from "@mantine/core";
import { collection, getDocs, where, query } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import CryptoJS from "crypto-js";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Loginform = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // console.log(Loginform.values);
  const onSubmit = async (event) => {
    // console.log(values);
    event.preventDefault();
    try {
      dispatch(ShowLoading());
      const qry = query(
        collection(fireDb, "users"),
        where("email", "==", Loginform.values.email)
      );
      const existingUsers = await getDocs(qry);
      if (existingUsers.size > 0) {
        //  console.log();
        const decryptedPassword = CryptoJS.AES.decrypt(
          existingUsers.docs[0].data().password,
          "expense_tracker"
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword === Loginform.values.password) {
          // alert("User logged in successfully");
          showNotification({
            title: "User logged in successfully",
            color: "green",
          });
          const dataToPutInLocalstorage = {
            name: existingUsers.docs[0].data().name,
            email: existingUsers.docs[0].data().email,
            id: existingUsers.docs[0].id,
          };
          localStorage.setItem("user", JSON.stringify(dataToPutInLocalstorage));
          navigate("/");
          // localStorage.setItem(
          //   "user1",
          //   JSON.stringify(existingUsers.docs[0].data().id)
          // );
        } else {
          // alert("Invalid credentials");
          showNotification({
            title: "Invalid credentials",
            color: "red",
          });
        }
      } else {
        // alert("User not found");
        showNotification({
          title: "User not found",
          color: "red",
        });
      }
      dispatch(HideLoading());
    } catch (error) {
      // alert("Something Went Wrong");\
      dispatch(HideLoading());
      showNotification({
        title: "Something went wrong",
        color: "red",
      });
    }
    // console.log(Loginform.values);
  };
  return (
    <div className="flex h-screen justify-center items-center auth">
      <Card sx={{ width: 400, padding: "sm" }} shadow="lg" withBorder>
        <Title order={2} mb={5} color="gray">
          EXPENSE TRACKER LOGIN
        </Title>
        <Divider variant="solid" color="grey" />
        <form action="" onSubmit={onSubmit}>
          <Stack mt={5}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              {...Loginform.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              {...Loginform.getInputProps("password")}
            />
            <Button type="submit" color="teal">
              Login
            </Button>
            <Anchor href="/register" color="teal">
              Don't have an account? Register
            </Anchor>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default Login;
