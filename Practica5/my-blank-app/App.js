import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const Texto = () => {
    return <Text>Hola mundo desde react</Text>;
  };

  return (
    <View style={styles.container}>
      {/* el componente view */}

      {/* Texto es donde podemos cambiar el texto */}
      <Text>Open up App.js to start working on your app!</Text>
      <Texto />
      {/* StatusBar es donde se muestra la bateria, notificacionex, etc, todo lo que esta en la parte superior de un celular */}
      <StatusBar style="auto" />
      <Button title="Presioname" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
