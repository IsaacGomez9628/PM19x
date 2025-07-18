import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.icnoRow}>
        <Ionicons name="person-outline" size={28} color="green" />
        <Text style={styles.title}>Perfil de usuario</Text>
        <Pressable
          style={[styles.button, styles.buttonProfile]}
          onPress={() => navigation.navigate("Detalles")}
        >
          <Text>Ir a Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icnoRow: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    color: "green",
  },
});
