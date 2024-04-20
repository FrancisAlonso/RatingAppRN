import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Importar imágenes locales
import pinkFloydImage from './assets/pink-floyd.jpg';
import radioheadImage from './assets/radiohead.jpg';
import beatlesImage from './assets/the-beatles.jpg';
import ledZeppelinImage from './assets/led-zeppelin.jpg';
import slipknotImage from './assets/slipknot.jpg';
import starFilledImage from './assets/star_filled.png';
import starOutlineImage from './assets/star_outline.png';

const bandas = [
  { id: 1, nombre: 'Pink Floyd', descripcion: 'Legendaria banda de rock psicodélico y rock progresivo.', foto: pinkFloydImage },
  { id: 2, nombre: 'Radiohead', descripcion: 'Innovadora banda de rock alternativo y experimental.', foto: radioheadImage },
  { id: 3, nombre: 'The Beatles', descripcion: 'Una de las bandas más influyentes de la historia de la música.', foto: beatlesImage },
  { id: 4, nombre: 'Led Zeppelin', descripcion: 'Pioneros del hard rock y el heavy metal.', foto: ledZeppelinImage },
  { id: 5, nombre: 'Slipknot', descripcion: 'Banda de metal conocida por su estilo visual y su música agresiva.', foto: slipknotImage },
];

const jugadores = [
  { id: 1, nombre: 'Messi', descripcion: 'Descripción de Messi', foto: 'url de la imagen' },
  { id: 2, nombre: 'CR7', descripcion: 'Descripción de CR7', foto: 'url de la imagen' },
  { id: 3, nombre: 'Ronaldo Nazario', descripcion: 'Descripción de Ronaldo Nazario', foto: 'url de la imagen' },
  { id: 4, nombre: 'Ronaldinho', descripcion: 'Descripción de Ronaldinho', foto: 'url de la imagen' },
  { id: 5, nombre: 'Zidane', descripcion: 'Descripción de Zidane', foto: 'url de la imagen' },
];

const frutas = [
  { id: 1, nombre: 'Duraznos', descripcion: 'Descripción de los Duraznos', foto: 'url de la imagen' },
  { id: 2, nombre: 'Mangos', descripcion: 'Descripción de los Mangos', foto: 'url de la imagen' },
  { id: 3, nombre: 'Manzana', descripcion: 'Descripción de la Manzana', foto: 'url de la imagen' },
  { id: 4, nombre: 'Melon', descripcion: 'Descripción del Melon', foto: 'url de la imagen' },
  { id: 5, nombre: 'Otra Fruta', descripcion: 'Descripción de la Otra Fruta', foto: 'url de la imagen' },
];

const Star = ({ filled }) => (
  <Image
    source={filled ? starFilledImage : starOutlineImage}
    style={{ width: 25, height: 25 }} // Tamaño de las estrellas
  />
);

export default function App() {
  const [puntuaciones, setPuntuaciones] = useState({});
  const [puntuacionesTotales, setPuntuacionesTotales] = useState({});
  const [mostrarBandas, setMostrarBandas] = useState(true);
  const [mostrarJugadores, setMostrarJugadores] = useState(false);
  const [mostrarFrutas, setMostrarFrutas] = useState(false);

  const lista = mostrarBandas ? bandas : mostrarJugadores ? jugadores : frutas;

  const handlePuntuacion = (id, puntuacion) => {
    const nuevaPuntuacion = { ...puntuaciones, [id]: [...(puntuaciones[id] || []), puntuacion] };
    setPuntuaciones(nuevaPuntuacion);

    const nuevaPuntuacionTotal = { ...puntuacionesTotales, [id]: {
      total: (puntuacionesTotales[id]?.total || 0) + puntuacion,
      cantidad: (puntuacionesTotales[id]?.cantidad || 0) + 1
    }};
    setPuntuacionesTotales(nuevaPuntuacionTotal);
  };

  const handleLista = (bandas, jugadores, frutas) => {
    if (mostrarBandas) {
      setPuntuacionesTotales(bandas.reduce((acc, band) => {
        const total = puntuacionesTotales[band.id] ? puntuacionesTotales[band.id].total : 0;
        return { ...acc, [band.id]: { total, cantidad: 0 } };
      }, {}));
    } else if (mostrarJugadores) {
      setPuntuacionesTotales(jugadores.reduce((acc, jugador) => {
        const total = puntuacionesTotales[jugador.id] ? puntuacionesTotales[jugador.id].total : 0;
        return { ...acc, [jugador.id]: { total, cantidad: 0 } };
      }, {}));
    } else if (mostrarFrutas) {
      setPuntuacionesTotales(frutas.reduce((acc, fruta) => {
        const total = puntuacionesTotales[fruta.id] ? puntuacionesTotales[fruta.id].total : 0;
        return { ...acc, [fruta.id]: { total, cantidad: 0 } };
      }, {}));
    }
  };

  const renderItem = ({ item }) => {
    const totalPuntuaciones = puntuacionesTotales[item.id]?.total || 0;
    const cantidadPuntuaciones = puntuacionesTotales[item.id]?.cantidad || 0;
    const promedio = cantidadPuntuaciones > 0 ? totalPuntuaciones / cantidadPuntuaciones : 0;

    return (
      <View style={styles.item}>
        <Image source={{ uri: item.foto }} style={styles.image} />
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
            <Text>Total de puntuaciones: {cantidadPuntuaciones}</Text>
            <View style={styles.estrellasContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Star key={index} filled={index <= Math.round(promedio)} />
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.botonesLista}>
        <TouchableOpacity
          style={styles.botonLista}
          onPress={() => {
            handleLista(bandas, jugadores, frutas);
            setPuntuaciones({});
            setMostrarBandas(true);
            setMostrarJugadores(false);
            setMostrarFrutas(false);
          }}
        >
          <Text>Bandas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonLista}
          onPress={() => {
            handleLista(bandas, jugadores, frutas);
            setPuntuaciones({});
            setMostrarBandas(false);
            setMostrarJugadores(true);
            setMostrarFrutas(false);
          }}
        >
          <Text>Jugadores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonLista}
          onPress={() => {
            handleLista(bandas, jugadores, frutas);
            setPuntuaciones({});
            setMostrarBandas(false);
            setMostrarJugadores(false);
            setMostrarFrutas(true);
          }}
        >
          <Text>Frutas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: 50,
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
  estrellasContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  botonesLista: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  botonLista: {
    backgroundColor: '#F8FBEF', // Color de fondo de los botones de lista
    padding: 10,
    borderRadius: 5,
    borderWidth: 1, // Agregar borde
    borderColor: '#CCCCCC', // Color del borde
  },
});


