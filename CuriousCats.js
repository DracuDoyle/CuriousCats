import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default class CuriousCats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catImage: null,
      catFact: null,
    };
  }

  handleButtonPress = () => {
    this.fetchCatImage();
    this.fetchCatFact();
  };

  fetchCatImage = async () => {
    try {
      const apiKey = '<secret_key>';
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`);
      const data = await response.json();
      this.setState({ catImage: data[0].url });
    } catch (error) {
      Alert.alert('Error getting the image');
    }
  };

  fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      this.setState({ catFact: data.fact });
    } catch (error) {
      Alert.alert('Error getting the cat fact');
    }
  };

  render() {
    const { catImage, catFact } = this.state;

    return (
      <ImageBackground source={require('./wallpaper.jpeg')} style={styles.wallpaper}>
        <View style={styles.content}>
          {catImage && <Image source={{ uri: catImage }} style={styles.catImage} />}
          {catFact && <Text style={styles.catFact}>{catFact}</Text>}
          <TouchableOpacity style={styles.button} onPress={this.handleButtonPress}>
            <Text style={styles.buttonText}>Random Cat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerContent}>
            Developed by: Fregoso Rivera, Juan Bayron
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  wallpaper: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  catImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: -200,
  },
  catFact: {
    marginBottom: 25,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
  },
  footerContent: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
