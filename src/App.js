import React, {useState, useEffect, useReducer} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  TextInput,
  Keyboard,
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

//import AsyncStorage from '@react-native-community/async-storage';

export default function App(){
  //Criar a constantes para a lista
  const [task, setTask] = useState([]);
  const [newTask, newSetTask] = useState("");


  async function addItemList(){
    const search = task.filter(task => task == newTask);
    
    if(newTask == ""){return;}

    if(search.length != 0){
      Alert.alert("Atenção","Esse item já está incluso!");
      return;
    }else{
      setTask([ ... task, newTask]) //atribui toda a lista que estava em task com esses ... e adiciona o newtask.
      Keyboard.dismiss; //Minimizar o teclado
      newSetTask(""); //Limpar o campo
      
    }
  }
  async function removeItem(itemExcluido){
    Alert.alert("Deletar item","Tem certeza que deseja deletar esse item ?",
    [{
      text:"Cancelar",
      onPress: () => {
        return;
      }, style:"cancel"
    },
    {
      text:"Confirmar",
      onPress: () => setTask(task.filter(tasks => tasks!= itemExcluido)), 
      style:"default"
    }],{cancelable:false});
   
  }

  useEffect(()=>{
    async function loadData(){
 
      const task = await AsyncStorage.getItem("task");
      if(task != null){
        setTask(JSON.parse(task));
      }
    }
    loadData();
  },[]);

  useEffect(()=>{
    async function saveData(){
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    saveData();
  },[task]);

  return (
    <> 
      <View style = {styles.container}>
          <View style = {styles.body}>
          <Text style={styles.title}>Lista de Compras</Text>

           <FlatList 
           style = {styles.FlatList} 
           data = {task} //Obj da lista
           keyExtractor = {item => item.toString()} //id do objeto, funciona como um hash
           showsVerticalScrollIndicator={false}
           renderItem = {({ item }) => //Qual item ele vai renderizar
           <View style = {styles.viewItem}>
              <View>
                <Text style={styles.itemList}>{item}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={()=> removeItem(item)} >
                  <Image style={{width:40,height:40,margin:-10}} source={require("testeComponent/src/lixeira.png")}></Image>
                </TouchableOpacity>
              </View>
            </View>}>
           </FlatList> 

          </View>
          <View style = {styles.form}>
            <TextInput 
              style = {styles.input} 
              value= {newTask}/*é onde o valor da variavel vai ficar*/
              onChangeText={text => newSetTask(text)} 
              placeholder="Adicione uma tarefa">
            </TextInput>
            <TouchableOpacity style = {styles.button} onPress={() => addItemList()}> 
              <Image style={{width:40, height:40}}source={require("testeComponent/src/add--v2.png")}></Image>
              </TouchableOpacity>
          </View>
            
    
        </View>
       
    </> 
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  container:{
    paddingHorizontal:20,
    paddingVertical:20,
    marginTop:20,
    flex:1,
    backgroundColor:"#FFF9"
  },

  body:{
    flex:1,
  },

  form: {
    padding:0,
    height:60,
    justifyContent:"center",
    alignSelf:"stretch",
    flexDirection:"row",
    paddingTop:13,
    borderTopWidth:1,
    borderColor:"#FFF9",
  },

  input:{
    flex:1,
    height:45,
    color:"#000",
    backgroundColor:"#eeee",
    borderRadius:4,
    paddingStart:10,
    paddingVertical:5,
    paddingHorizontal:5,
    borderRadius:16,
    borderWidth:1,
    borderColor:"#eeee"
  },

  button: {
    height:45,
    width:70,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#eee",
    borderRadius:15,
    marginLeft:10,
    marginEnd: 5
  },
  txtEnviar:{
    color:"#FFFFFF",
    fontSize:15,
  },

  FlatList:{
    flex:1,
    marginTop:5,
  },
  itemList:{
    fontSize:17,
    color:"#000",
    marginTop:5,
    marginStart:10
  },
 viewItem:{
    marginBottom:15,
    padding:15,
    borderRadius:15,
    backgroundColor:"#eee",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    borderColor:"#000",
    borderWidth:1,
  }, 
  itemDell:{
    color:"#FFFF"
  },
  viewDell:{
    height:30,
    width:70,
    alignItems:"center",
    borderRadius:15,
    padding:5,
    backgroundColor:"#B22222"
  },

  title:{
    fontSize:24,
    color:"#000A",
    marginStart:10,
    marginBottom:5
  }

});

