import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Albumes = () => {
  const albumes = ['Album 1', 'Album 2', 'Album 3', 'Album 4', 'Album 5'];

  const handleSelectAlbum = (album) => {
    // Aquí puedes implementar la lógica para asignar puntos al álbum seleccionado
    console.log('Seleccionaste el álbum:', album);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Albumes</Text>
      {albumes.map((album, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectAlbum(album)}
          style={styles.album}
        >
          <Text>{album}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  album: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 5,
  },
});

export default Albumes;