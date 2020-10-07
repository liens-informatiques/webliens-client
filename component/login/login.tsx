import React, { useMemo, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

// framework css
import { Button, Form, Input, Item, Label, Text, Content } from "native-base";

// // style
import styles from "./loginStyle.js";
import { Image } from "react-native";

// // library formik for form
import { Formik } from "formik";
import * as yup from "yup";

// rest call
import { ApiService } from "../../service/ApiService";

// expo
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export interface LoginProps {
  navigation: any;
}

const Login = ({ navigation }: LoginProps) => {
  const apiService = useMemo(() => new ApiService(), []);
  const [errorConnexion, SetErrorConnexion] = useState<string>("");

  async function handleSubmit(values: Object) {
    let token: any;

    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      values["device_token"] = null;
    } else {
      token = await Notifications.getExpoPushTokenAsync();
      values["device_token"] = token.data;
    }
    values["__cle_dev"] = 300020010804;
    apiService
      .login(values)
      .then(async (res) => {
        console.log("token envoyé", res.data.token_auth);
        if (res.data.login) {
          try {
            await AsyncStorage.removeItem("token_auth");
            await AsyncStorage.setItem(
              "token_auth",
              res.data.token_auth.toString()
            );
          } catch (e) {}
          navigation.navigate("Messagerie");
        } else {
          SetErrorConnexion(res.data.error);
        }
      })
      .catch((e) => {
        SetErrorConnexion("veuillez contacter l'administrateur");
      });
  }

  return (
    <Content style={styles.form}>
      <Image
        source={require("./logo.jpg")}
        style={styles.logoForm}
        resizeMode={"center"}
      />
      <Formik
        initialValues={{
          login: "ML",
          password: "Promer1913",
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={yup.object().shape({
          login: yup.string().required("champs obligatoire"),
          password: yup.string().required("champs obligatoire"),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <Form>
            <Item floatingLabel>
              <Label>Login</Label>
              <Input
                value={values.login}
                onChangeText={handleChange("login")}
                onBlur={() => setFieldTouched("login")}
                onTouchStart={() => SetErrorConnexion("")}
                placeholder='login'
              />
            </Item>
            {touched.login && errors.login && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.login}
              </Text>
            )}
            <Item floatingLabel last>
              <Label>Mot de passe</Label>
              <Input
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder='Password'
                onBlur={() => setFieldTouched("password")}
                onTouchStart={() => SetErrorConnexion("")}
                secureTextEntry={true}
              />
            </Item>
            {touched.password && errors.password && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.password}
              </Text>
            )}
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errorConnexion}
            </Text>
            <Button
              style={styles.valid}
              primary
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text> login </Text>
            </Button>
          </Form>
        )}
      </Formik>
      <Button onPress={() => test()}>
        <Text>Hello word</Text>
      </Button>
    </Content>
  );
};

async function test() {
  let token_auth = await AsyncStorage.getItem("token_auth");
  console.log("token vaut ", token_auth);
}

export default Login;
