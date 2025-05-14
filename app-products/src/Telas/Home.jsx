import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';


export default function Home({ navigation }) {

  return (
    <ImageBackground 
      source={require('../../assets/bg.png')}
      style={styles.container}
    >
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CadastrarProdutos")}>
        <Text style={styles.subtitle}>Cadastre Produtos</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});