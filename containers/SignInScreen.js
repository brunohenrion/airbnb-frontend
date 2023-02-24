import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("sorakol@gmx.fr");
  const [password, setPassword] = useState("pass");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");
      // 1 - FRONT Vérifier que tous les champs sont remplis

      if (!email || !password) {
        setError("Remplir tous les champs");
        return;
      }

      // alert("Vérifications passées ! ");
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      //si je reçois un token alors j'appelle la fonction setToken
      if (response.data) {
        console.log(response.data);
        setToken(response.data.token);
      }
    } catch (error) {
      // 3 - BACK  Vérifier que l'email soit dispo
      // 4 - BACK  Vérifier que le username soit dispo
      const message = error.response.data.error;
      const statusCode = error.response.status;

      // console.log(typeof error.response.status);
      // console.log(message);
      if (statusCode === 400) {
        setError(message);
      }
    }
    // setToken("39898DU983J8D9934");
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(input) => {
            setEmail(input);
          }}
          placeholder="Your email"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(input) => {
            setPassword(input);
          }}
          placeholder="Your password"
        />

        <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        <TouchableOpacity
          onPress={() => {
            // alert("CLicked !");
            submit();
          }}
          style={styles.btn}
        >
          <Text>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginVertical: 25,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    borderBottomColor: "#ffbac0",
    borderBottomWidth: 2,
    height: 40,
    width: 300,
    marginTop: 40,
  },
  btn: {
    borderColor: "#ffbac0",
    borderWidth: 2,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
    borderRadius: 10,
  },
});

/* 

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        const token = response.data.token;

        setToken(token);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    handleSubmit();
    console.log("useEffect executed");
  }, [submit]);

  return (
    <View>
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <Button
          title="Sign in"
          onPress={async () => {
            setSubmit(true);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

*/
