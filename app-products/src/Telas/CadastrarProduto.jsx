import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState("")
  const [precoProduto, setPrecoProduto] = useState()
  const [listaProdutos,setListaProduto]=useState([])
  const[produtoEditado,setProdutoEditado]=useState(null)

  useEffect(()=>{
    BuscarDados()
  },[])

  async function Salvar(){
    let produtos = []

    if(await AsyncStorage.getItem("PRODUTOS")!=null){
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"))
    }

    if(produtoEditado){
      produtos[produtoEditado.index] = {nome:nomeProduto,preco:precoProduto}
    }else{
      produtos.push({nome:nomeProduto,preco:precoProduto})
    }

   
    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(produtos))

    alert(produtoEditado?"PRODUTO ATUALIZADO":"PRODUTO CADASTRADO")

    setProdutoEditado(null)

    setNomeProduto('')
    setPrecoProduto('')

    BuscarDados()

  }

  async function BuscarDados(){
    const prod = await AsyncStorage.getItem("PRODUTOS")
    setListaProduto(JSON.parse(prod))
  
  }
  async function DeletarProduto(index){
    console.log(index)
    const tempDados = listaProdutos
    const dados = tempDados.filter((item,ind)=>{
      return ind!==index
    });

    setListaProduto(dados)

    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(dados))

  }

  function EditarProduto(index){
    const produto = listaProdutos[index]
    setNomeProduto(produto.nome)
    setPrecoProduto(produto.preco)
    setProdutoEditado({index})
  }

  return (
    <View style={styles.container}>
      <Text>CADASTRO</Text>
      <StatusBar style="auto" />
      <TextInput
        placeholder='Digite o nome do produto'
        style={styles.input}
        value={nomeProduto}
        onChangeText={(value) => setNomeProduto(value)}
      />

      <TextInputMask
        type='money'
        placeholder='Digite o preço do produto'
        style={styles.input}
        value={precoProduto}
        onChangeText={(value) => setPrecoProduto(value)}
      />

      <TouchableOpacity style={styles.btn} onPress={Salvar}>
        <Text style={{color:"white"}}>{produtoEditado?"ATUALIZAR":"CADASTRAR"}</Text>
      </TouchableOpacity>

      <FlatList 
        data={listaProdutos}
        renderItem={({item,index})=>{
          return(
            <View style={styles.listarFlat}>
              <View>
                <Text>NOME:{item.nome} - PREÇO:{item.preco}</Text>
              </View>

              <View style={{flexDirection:"row"}}>
              <TouchableOpacity 
                  onPress={()=>DeletarProduto(index)}
                  style={styles.btnExcluir}
                >
                  <Text>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={()=>EditarProduto(index)}
                  style={styles.btnEditar}
                >
                  <Text>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:30
  },
  input:{
    borderWidth:1,
    height:50,
    width:300,
    borderRadius:15,
    marginTop:10
  },
  btn:{
    borderWidth:1,
    width:300,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
    marginTop:10
  },
  listarFlat:{
    borderWidth:1,
    width:300,
    height:70,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:7
  },
  btnExcluir:{
    flexDirection:'column',
    justifyContent:"space-around",
    alignItems:"center",
    borderRadius:12,
    width:100,
    height:20,
    marginTop:5
  },
  btnEditar:{
    flexDirection:'column',
    justifyContent:"space-around",
    alignItems:"center",
    borderRadius:12,
    width:100,
    height:20,
    marginTop:5,
    marginLeft:10
  }
});