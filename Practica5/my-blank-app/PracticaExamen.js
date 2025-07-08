import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Switch,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
  const [query, setQuery] = useState("");
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exactSearch, setExactSearch] = useState(false);

  const API_KEY = "c9856d0cb57c3f14bf75bdc6c063b8f3";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const buscarPelicula = async () => {
    if (!query.trim()) {
      Alert.alert("Por favor ingresa el nombre de la película");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=es-ES`
      );

      let resultados = response.data.results;

      if (exactSearch) {
        resultados = resultados.filter(
          (p) => p.title.toLowerCase() === query.toLowerCase()
        );
      }

      setDatos(resultados);
    } catch (error) {
      Alert.alert("Error al conectar con la API");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <Image
        source={{
          uri: item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : "https://via.placeholder.com/100x150?text=No+Image",
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.movieTitle}>{item.title}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="calendar-today" size={16} color="#666" />
            <Text style={styles.detailText}>
              {item.release_date?.split("-")[0] || "N/A"}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.detailText}>
              {item.vote_average?.toFixed(1) || "N/A"}
            </Text>
          </View>
        </View>

        {item.overview && (
          <Text style={styles.overview} numberOfLines={2}>
            {item.overview}
          </Text>
        )}
      </View>

      <View style={styles.chevronContainer}>
        <Icon name="chevron-right" size={24} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      <View style={styles.header}>
        <View style={styles.headerContent}></View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Buscar película..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={buscarPelicula}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery("")}
              style={styles.clearButton}
            >
              <Icon name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabelContainer}>
            <Icon name="tune" size={18} color="#666" />
            <Text style={styles.switchLabel}>
              {exactSearch ? "Búsqueda Exacta" : "Búsqueda Aproximada"}
            </Text>
          </View>
          <Switch
            value={exactSearch}
            onValueChange={setExactSearch}
            trackColor={{ false: "#e0e0e0", true: "#3498db" }}
            thumbColor={exactSearch ? "#fff" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity
          style={[styles.boton, loading && styles.botonDisabled]}
          onPress={buscarPelicula}
          disabled={loading}
        >
          <Icon name="search" size={20} color="#fff" />
          <Text style={styles.botonTexto}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Buscando películas...</Text>
        </View>
      )}

      {!loading && datos.length > 0 && (
        <FlatList
          data={datos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {!loading && datos.length === 0 && query.trim() && (
        <View style={styles.noResultsContainer}>
          <Icon name="movie-filter" size={80} color="#ccc" />
          <Text style={styles.noResultsTitle}>No se encontraron películas</Text>
          <Text style={styles.noResultsMessage}>
            Intenta con otro título o desactiva la búsqueda exacta
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#2c3e50",
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 10,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#e0e0e0",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "#f8f9fa",
    marginBottom: 20,
  },
  searchIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 10,
    marginRight: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginLeft: 8,
  },
  boton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  botonDisabled: {
    backgroundColor: "#bdc3c7",
    shadowOpacity: 0.1,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  noResultsMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  poster: {
    width: 90,
    height: 135,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#2c3e50",
  },
  detailsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
    fontWeight: "500",
  },
  overview: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginTop: 5,
  },
  chevronContainer: {
    marginLeft: 10,
  },
});
