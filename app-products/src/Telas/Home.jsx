import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      
      <Image source={require('../../assets/icone.png')} style={styles.image} />

      <View style={styles.welcome}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Cadastre um novo produto abaixo</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Produto")}
        activeOpacity={0.8}
      >
        <Feather name="plus-circle" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#6A0DAD',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  marginBottom: 20,
},
});
