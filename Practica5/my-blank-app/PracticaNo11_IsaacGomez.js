import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Switch,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";

export default function App() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Simular carga inicial con logo personalizado
  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleRegistro = () => {
    // Validación de campos vacíos
    if (!nombre.trim() || !email.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    // Validación de términos
    if (!aceptaTerminos) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones");
      return;
    }

    // Validación básica de email
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido");
      return;
    }

    // Mostrar datos ingresados
    Alert.alert(
      "Registro Exitoso",
      `Nombre: ${nombre}\nEmail: ${email}\nTérminos aceptados: ${
        aceptaTerminos ? "Sí" : "No"
      }`,
      [
        {
          text: "OK",
          onPress: () => {
            // Resetear formulario después de aceptar
            setNombre("");
            setEmail("");
            setAceptaTerminos(false);
          },
        },
      ]
    );
  };

  if (cargando) {
    return (
      <View style={styles.cargaContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.cargaTexto}>Cargando aplicación...</Text>
        {/* Logo personalizado */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>R</Text>
          </View>
          <Text style={styles.logoNombre}>RegistroApp</Text>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://plus.unsplash.com/premium_photo-1672947570368-1190dd530542?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Crear Cuenta</Text>

          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: juan@correo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.terminosContainer}>
            <Switch
              value={aceptaTerminos}
              onValueChange={setAceptaTerminos}
              trackColor={{ false: "#767577", true: "#4ECDC4" }}
              thumbColor={aceptaTerminos ? "#f4f3f4" : "#f4f3f4"}
            />
            <Text style={styles.terminosTexto}>
              Acepto los
              <Text
                style={styles.terminosLink}
                onPress={() => setModalVisible(true)}
              >
                {" "}
                términos y condiciones
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
            <Text style={styles.botonTexto}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para Términos y Condiciones */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Términos y Condiciones</Text>
            <Text style={styles.modalTexto}>
              1. Al registrarte, aceptas proporcionar información precisa y
              verídica.{"\n\n"}
              2. Te comprometes a utilizar esta aplicación de manera
              responsable.{"\n\n"}
              3. Nos reservamos el derecho de suspender cuentas que violen
              nuestros términos.{"\n\n"}
              4. Tu información personal será protegida según nuestra política
              de privacidad.{"\n\n"}
              5. Puedes solicitar la eliminación de tu cuenta en cualquier
              momento.
            </Text>
            <TouchableOpacity
              style={styles.modalBoton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBotonTexto}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cargaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A535C",
  },
  cargaTexto: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  logoNombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A535C",
    marginBottom: 25,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#1A535C",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderColor: "#4ECDC4",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "white",
  },
  terminosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  terminosTexto: {
    marginLeft: 10,
    color: "#1A535C",
    fontSize: 15,
  },
  terminosLink: {
    color: "#FF6B6B",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  boton: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  botonTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 350,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A535C",
    marginBottom: 15,
    textAlign: "center",
  },
  modalTexto: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 20,
  },
  modalBoton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalBotonTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
