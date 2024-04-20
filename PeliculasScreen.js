import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

const peliculas = [
  { id: 1, nombre: 'Pelicula 1', descripcion: 'Descripción de la Película 1', foto: require('./assets/pelicula1.jpg') },
  { id: 2, nombre: 'Pelicula 2', descripcion: 'Descripción de la Película 2', foto: require('./assets/pelicula2.jpg') },
  { id: 3, nombre: 'Pelicula 3', descripcion: 'Descripción de la Película 3', foto: require('./assets/pelicula3.jpg') },
  // Agrega más películas si lo deseas
];

const PeliculasScreen = () => {
  const [puntuaciones, setPuntuaciones] = useState({});
  const [puntuacionesTotales, setPuntuacionesTotales] = useState({});

  const handlePuntuacion = (id, puntuacion) => {
    const nuevaPuntuacion = { ...puntuaciones, [id]: [...(puntuaciones[id] || []), puntuacion] };
    setPuntuaciones(nuevaPuntuacion);

    const nuevaPuntuacionTotal = { ...puntuacionesTotales, [id]: {
      total: (puntuacionesTotales[id]?.total || 0) + puntuacion,
      cantidad: (puntuacionesTotales[id]?.cantidad || 0) + 1
    }};
    setPuntuacionesTotales(nuevaPuntuacionTotal);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.foto} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <View style={styles.botonesContainer}>
          {[1, 2, 3, 4, 5].map((puntuacion) => (
            <TouchableOpacity
              key={puntuacion}
              style={styles.boton}
              onPress={() => handlePuntuacion(item.id, puntuacion)}
            >
              <Text>{puntuacion}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.puntuacion}>
          <Text>Total de puntuaciones: {puntuacionesTotales[item.id]?.cantidad || 0}</Text>
          <Text>Promedio: {puntuacionesTotales[item.id]?.total ? puntuacionesTotales[item.id].total / puntuacionesTotales[item.id].cantidad : 0}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={peliculas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FBEF', // Cambiar color de fondo
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Georgia', // Cambiar tipografía
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Georgia', // Cambiar tipografía
  },
  botonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centrar botones
  },
  boton: {
    backgroundColor: '#A2FFAB', // Cambiar color de botones
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  puntuacion: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PeliculasScreen;
