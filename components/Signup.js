import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { auth, createUserWithEmailAndPassword } from "../firebase/index";

export default function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created! Please login.");
        goToLogin();  // ← RETURNS TO LOGIN BEFORE APP
      })
      .catch((err) => alert(err.message));
  };

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <Image source={require("../assets/MyCart.png")} style={styles.logo} />

      <Text style={styles.title}>Create Account</Text>

      {/* INPUTS */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* SIGNUP BUTTON */}
      <Pressable onPress={signupUser} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      {/* BACK TO LOGIN */}
      <Pressable onPress={goToLogin}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    padding: 20 
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: { 
    fontSize: 30, 
    fontWeight: "700",
    marginBottom: 25 
  },

  input: {
    width: "90%",
    backgroundColor: "#F2F2F2",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    fontSize: 16,
  },

  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    width: "90%",
    borderRadius: 12,
    marginTop: 15,
  },

  buttonText: { 
    color: "white", 
    fontSize: 17,
    textAlign: "center",
    fontWeight: "600" 
  },

  link: { 
    textAlign: "center", 
    marginTop: 20, 
    fontSize: 15,
    color: "#444"
  },
});
