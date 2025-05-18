import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CadastrarProduto({ navigation }) {

  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [dataFabricacao, setDataFabricacao] = useState("");
  const [validade, setValidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [lote, setLote] = useState("");
  const [listaProdutos, setListaProduto] = useState([]);
  const [produtoEditado, setProdutoEditado] = useState(null);
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraAtiva, setCameraAtiva] = useState(false);

  function handleBarCodeScanned({ type, data }) {
      setScanned(true);
      setCameraAtiva(false);

    try {
      const produtoQR = JSON.parse(data);

      setNomeProduto(produtoQR.nome || '');
      setPrecoProduto(produtoQR.preco || '');
      setDataFabricacao(produtoQR.fabricacao || '');
      setValidade(produtoQR.validade || '');
      setQuantidade(produtoQR.quantidade || '');
      setLote(produtoQR.lote || '');

      Alert.alert("Sucesso", "Dados do QR code importados!");
    } catch (e) {
      Alert.alert("Erro", "QR Code inválido ou dados incorretos.");
    }
  }

  useEffect(() => {
    BuscarDados();
  }, []);

  async function Salvar() {
    let produtos = [];

    if (await AsyncStorage.getItem("PRODUTOS") != null) {
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"));
    }

    const novoProduto = {
      nome: nomeProduto,
      preco: precoProduto,
      fabricacao: dataFabricacao,
      validade: validade,
      quantidade: quantidade,
      lote: lote
    };

    if (produtoEditado) {
      produtos[produtoEditado.index] = novoProduto;
    } else {
      produtos.push(novoProduto);
    }

    await AsyncStorage.setItem("PRODUTOS", JSON.stringify(produtos));

    Alert.alert("Sucesso", produtoEditado ? "Produto atualizado!" : "Produto cadastrado!");

    setProdutoEditado(null);
    setNomeProduto('');
    setPrecoProduto('');
    setDataFabricacao('');
    setValidade('');
    setQuantidade('');
    setLote('');
    BuscarDados();
  }

  async function BuscarDados() {
    const prod = await AsyncStorage.getItem("PRODUTOS");
    if (prod) setListaProduto(JSON.parse(prod));
  }

  async function DeletarProduto(index) {
    const dados = listaProdutos.filter((_, ind) => ind !== index);
    setListaProduto(dados);
    await AsyncStorage.setItem("PRODUTOS", JSON.stringify(dados));
  }

  function EditarProduto(index) {
    const produto = listaProdutos[index];
    setNomeProduto(produto.nome);
    setPrecoProduto(produto.preco);
    setDataFabricacao(produto.fabricacao);
    setValidade(produto.validade);
    setQuantidade(produto.quantidade);
    setLote(produto.lote);
    setProdutoEditado({ index });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro dos Produtos</Text>
      <StatusBar style="auto" />

      <TextInput
        placeholder="Nome do produto"
        style={styles.input}
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />

      <TextInputMask
        type="money"
        placeholder="Preço do produto"
        style={styles.input}
        value={precoProduto}
        onChangeText={setPrecoProduto}
      />

      <TextInput
        placeholder="Data de fabricação"
        style={styles.input}
        value={dataFabricacao}
        onChangeText={setDataFabricacao}
      />

      <TextInput
        placeholder="Validade"
        style={styles.input}
        value={validade}
        onChangeText={setValidade}
      />

      <TextInput
        placeholder="Quantidade"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Lote"
        style={styles.input}
        value={lote}
        onChangeText={setLote}
      />

      <TouchableOpacity style={styles.btn} onPress={Salvar} activeOpacity={0.8}>
        <Text style={styles.btnText}>{produtoEditado ? "ATUALIZAR" : "CADASTRAR"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#2A9D8F' }]}
          onPress={async () => {
            const { status } = await requestPermission();
            if (status === 'granted') {
              setScanned(false);
              setCameraAtiva(true);
            } else {
              Alert.alert("Permissão negada", "Permita o uso da câmera.");
            }
          }}
        >
          <Text style={styles.btnText}>LER QR CODE</Text>
        </TouchableOpacity>

        {cameraAtiva && (
        <CameraView
          style={{ width: '100%', height: 300, marginVertical: 20 }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      )}

      <FlatList
        data={listaProdutos}
        keyExtractor={(_, index) => index.toString()}
        style={{ marginTop: 20, width: "100%", paddingHorizontal: 20 }}
        renderItem={({ item, index }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.nome} - {item.lote}</Text>
              <Text style={styles.itemPrice}>Preço: {item.preco}</Text>
              <Text style={styles.itemPrice}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.itemPrice}>Fabricação: {item.fabricacao} - validade: {item.validade}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => EditarProduto(index)} style={styles.iconButton}>
                <Feather name="edit-3" size={20} color="#6A0DAD" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => DeletarProduto(index)} style={styles.iconButton}>
                <Feather name="trash-2" size={20} color="#E63946" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    height: 50,
    width: 300,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 6,
  },
  btn: {
    backgroundColor: '#6A0DAD',
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    marginLeft: 12,
  },
});
