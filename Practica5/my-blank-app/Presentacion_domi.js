//importaciones
import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet, Alert, Platform } from "react-native";
import React, { useState } from "react";

const showAlert = (message) => {
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert("Alert, message");
  }
};
//Main
export default function App() {
  return (
    //
    <View style={styles.container}>
      <Text style={styles.title}>React Native Button Test </Text>

      <View style={styles.section}>
        <Text style={styles.description}>Boton Básico</Text>
        <Button
          title="Presioname"
          onPress={() => showAlert("Boton presionado")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Boton con color:</Text>
        <Button
          title="Boton de color"
          color="#f194ff"
          onPress={() => showAlert("Boton de color presionado")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Boton deshabilitado:</Text>
        <Button
          title="Boton deshabilitado"
          disabled
          onPress={() => showAlert("Boton deshabilitado")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>Dos Botones</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Boton izquierdo"
            onPress={() => showAlert("Boton izquierdo presionado")}
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Boton derecho"
            onPress={() => showAlert("Boton derecho presionado")}
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#000000",
  },

  section: {
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonSpacer: {
    width: 10,
  },
});
